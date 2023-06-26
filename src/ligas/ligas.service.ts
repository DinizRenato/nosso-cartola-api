import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLigaDto } from './dtos/create-liga.dto';
import { Liga } from './entities/liga.entity';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class LigasService {

    constructor(
        @InjectRepository(Liga) private repository: Repository<Liga>,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private readonly httpService: HttpService
    ) { }

    async create(createLiga: CreateLigaDto) {
        const liga = this.repository.create(createLiga);
        return await this.repository.save(liga);
    }

    async findLigaByLigaId(liga_id: number) {
        return await this.repository.findOne({ where: { liga_id } });
    }

    async findLigaBySlugWithTimes(slug: string) {
        let liga = await this.findLigaBySlug(slug);
        liga.times = await this.usersService.findUsersByLigaId(liga.liga_id);
        return liga;
    }

    async findLigaBySlug(slug: string) {
        return await this.repository.findOne({
            where: { slug },
            // relations: ['times', 'times.time']
        });
    }

    async findLoggedUserLigas(token: string) {
        const response = await this.findLoggedUserLigasCartolaApi(token);
        const ligas: CreateLigaDto[] = response.data['ligas'];
        return this.insertUserLigas(ligas);
    }

    async insertUserLigas(ligas: CreateLigaDto[]) {

        const userLigas = [];

        for (const liga of ligas) {
            // só incluir ligas do tipo moderada
            if (liga.tipo == 'M') {
                const ligaExists = await this.findLigaByLigaId(liga.liga_id);
                if (!ligaExists) {
                    userLigas.push(await this.create(liga));
                } else {
                    userLigas.push(ligaExists);
                }
            }
        }
        return userLigas;
    }

    async findLigas() {
        return await this.repository.find();
    }

    async findLigasByUser(time_id: number): Promise<Liga[]> {
        const ligas = await this.repository
            .createQueryBuilder('ligas')
            .innerJoinAndSelect('ligas_times', 'lt', 'lt.liga_id = ligas.liga_id')
            .where("lt.time_id = :time_id", { time_id })
            .getMany();
        return ligas;
    }

    async findLoggedUserLigasCartolaApi(token: string) {
        const url = `${URL}/auth/ligas`;
        return await this.httpService.axiosRef.get(url,
            { headers: { 'X-GLB-Token': token } })
            .then((response) => response)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })
    }
}
