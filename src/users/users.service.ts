import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { LigasService } from 'src/ligas/ligas.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject(forwardRef(() => LigasService))
        private ligasService: LigasService,
        private readonly httpService: HttpService) { }

    create(createUser: CreateUserDto) {
        const user = this.repository.create(createUser);
        return this.repository.save(user);
    }

    async findLoggedUser(token: string) {
        const userResponse = await this.findLoggedUserCartolaApi(token);

        const user = await this.findByTimeId(userResponse.time_id)

        if (!user) {
            const createdUser = this.create(userResponse);
            return createdUser;
        }

        return user;
    }

    async findByTimeId(time_id: number) {
        let user = await this.repository.findOne({
            where: { time_id },
        });

        user.ligas = await this.ligasService.findLigasByUser(time_id);

        if (!user) {
            const response = await this.findUserTimeIdCartolaApi(time_id);
            const newUser: CreateUserDto = response.data['time'];
            const createdUser = this.create(newUser);
            return createdUser;
        }
        return user;
    }

    async findUserByIdWithLigas(time_id: number) {
        let user = await this.findByTimeId(time_id);
        user.ligas = await this.ligasService.findLigasByUser(time_id);
        return user;
    }

    async findByTimeSlug(slug: string) {
        const user = await this.repository.findOne({
            where: { slug },
            relations: ['ligas', 'ligas.liga']
        });

        if (!user) {
            const response = await this.findUserSlugCartolaApi(slug);
            const newUser: CreateUserDto = response.data['time'];
            const createdUser = this.create(newUser);
            return createdUser;
        }

        return user;
    }

    async findUsersByLigaId(liga_id: number) {
        const users = await this.repository
            .createQueryBuilder('users')
            .innerJoinAndSelect('ligas_times', 'lt', 'lt.time_id = users.time_id')
            .where('lt.liga_id = :liga_id', { liga_id })
            .getMany();
        return users;
    }

    async findAll() {
        const users = await this.repository.find();
        return users;
    }

    async update(time_id: number, attrs: Partial<User>) {
        const user = await this.repository.findOne({ where: { time_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.repository.save(user);
    }

    async findLoggedUserCartolaApi(token: string): Promise<User> {
        const url = `${URL}/auth/time/info`;
        return await this.httpService.axiosRef.get(url,
            { headers: { 'X-GLB-Token': token } })
            .then((response) => (response.data['time'] as User))
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            });
    }

    async findUserTimeIdCartolaApi(time_id: number): Promise<AxiosResponse<User>> {
        return await this.httpService.axiosRef.get(`${URL}/time/id/${time_id}`,
        ).then((response) => response)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            });
    }

    async findUserSlugCartolaApi(slug: string): Promise<AxiosResponse<User>> {
        return await this.httpService.axiosRef.get(`${URL}/time/slug/${slug}`,
        ).then((response) => response)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            });
    }

}
