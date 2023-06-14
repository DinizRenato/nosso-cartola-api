import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { AxiosResponse } from 'axios';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repository: Repository<User>, private readonly httpService: HttpService) { }

    create(createUser: CreateUserDto) {
        const user = this.repository.create(createUser);
        return this.repository.save(user);
    }

    async findLoggedUser(token: string) {

        const response = await this.findLoggedUserCartolaApi(token);
        console.log(response.data['time'])
        const userResponse: CreateUserDto = response.data['time'];

        const user = await this.repository.findOne({ where: { time_id: userResponse.time_id } })

        if (!user) {
            const createdUser = this.create(userResponse);
            return createdUser;
        }

        return user;
    }

    async findByTimeId(time_id: number) {
        const user = await this.repository.findOne({ where: { time_id } });

        if (!user) {
            const response = await this.findUserTimeIdCartolaApi(time_id);
            const newUser: CreateUserDto = response.data['time'];
            const createdUser = this.create(newUser);
            return createdUser;
        }

        return user;
    }

    async findByTimeSlug(slug: string) {
        const user = await this.repository.findOne({ where: { slug } });

        if (!user) {
            const response = await this.findUserSlugCartolaApi(slug);
            const newUser: CreateUserDto = response.data['time'];
            const createdUser = this.create(newUser);
            return createdUser;
        }

        return user;
    }

    async update(time_id: number, attrs: Partial<User>) {
        const user = await this.repository.findOne({ where: { time_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.repository.save(user);
    }

    async findLoggedUserCartolaApi(token: string): Promise<AxiosResponse<User>> {
        const url = `${URL}/auth/time/info`;
        return await this.httpService.axiosRef.get(url,
            { headers: { 'X-GLB-Token': token } })
            .then((response) => response)
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
