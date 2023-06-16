import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async findRodadasCartolaApi() {

        const url = `${URL}/rodadas`;

        return await this.httpService.axiosRef.get(url)
            .then((response) => response.data)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })

    }
}
