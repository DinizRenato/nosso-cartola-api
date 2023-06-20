import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRodada } from 'src/users-rodadas/user-rodada.entity';
import { User } from 'src/users/user.entity';
import { LessThan, Repository, createQueryBuilder } from 'typeorm';
import { Rodada } from './rodada.entity';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class RodadasService {

    constructor(
        @InjectRepository(Rodada) private repository: Repository<Rodada>,
        private readonly httpService: HttpService
    ) { }

    async create(createRodada: Rodada) {
        const rodada = this.repository.create(createRodada);
        return await this.repository.save(rodada);
    }

    async findRodadaById(rodada_id: number) {
        const rodada = await this.repository.findOne({
            where: { rodada_id }
        });
        return rodada;
    }

    async findFinishedRodadas() {
        const rodadas = await this.repository.find({
            where: {
                fim: LessThan(new Date())
            }
        })
        return rodadas;
    }

    async findRodadas() {

        const rodadas: Rodada[] = await this.repository.find();

        if (rodadas.length == 0) {

            const rodadasApi = await this.findRodadasCartolaApi();

            for (const rodada of rodadasApi) {
                let rodadaExists = await this.findRodadaById(rodada.rodada_id);
                if (!rodadaExists) {
                    await this.create(rodada);
                }
            }

            return rodadasApi;

        } else {
            return rodadas;
        }

    }

    async findUserRodadasWithoutScores(user: User) {

        const rodadas = await this.repository.createQueryBuilder('rodada')
            .leftJoinAndSelect('users_rodadas', 'ur', 'ur.rodada_id = rodada.rodada_id and ur.time_id = :time_id', {
                time_id: user.time_id
            })
            .where('rodada.fim < :today', { today: new Date() })
            .andWhere('ur.rodada_id IS NULL')
            .orderBy('rodada.rodada_id', 'ASC')
            .getMany();

        return rodadas;

    }

    async findRodadasCartolaApi() {

        const url = `${URL}/rodadas`;

        return await this.httpService.axiosRef.get(url)
            .then((response) => response.data)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })

    }
}
