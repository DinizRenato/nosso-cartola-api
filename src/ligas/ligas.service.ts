import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from './liga.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateLigaDto } from './dtos/create-liga.dto';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class LigasService {
    constructor(
        @InjectRepository(Liga) private repository: Repository<Liga>,
        private readonly httpService: HttpService
    ) { }

    async create(createLiga: CreateLigaDto) {
        const liga = this.repository.create(createLiga);
        return await this.repository.save(liga);
    }

    async findLigaByLigaId(liga_id: number) {
        return await this.repository.findOne({ where: { liga_id } });
    }

    async findLigaBySlug(slug: string) {
        return await this.repository.findOne({
            where: { slug },
            relations: ['times', 'times.time']
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
