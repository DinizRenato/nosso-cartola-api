import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RodadasService } from 'src/rodadas/rodadas.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserRodadaDto } from './dtos/create-user-rodada.dto';
import { UserRodada } from './user-rodada.entity';

const URL = 'https://api.cartolafc.globo.com';

export interface RodadaPontuacaoResponse {
    pontos_campeonato: number;
    pontos: number;
    patrimonio: number;
}

@Injectable()
export class UsersRodadasService {

    constructor(
        @InjectRepository(UserRodada) private repository: Repository<UserRodada>,
        private readonly httpService: HttpService,
        private readonly usersService: UsersService,
        private readonly rodadasService: RodadasService
    ) { }

    async create(createUserRodada: CreateUserRodadaDto) {
        const userRodada = this.repository.create(createUserRodada);
        return await this.repository.save(userRodada);
    }

    async findUserRodada(time_id: number, rodada_id: number) {

        const userRodada = this.repository.findOne({
            where: {
                time_id,
                rodada_id
            }
        });
        return userRodada;
    }

    async insertLoggedUserAllScorePreviousRounds(token: string) {
        const user = await this.usersService.findLoggedUser(token);
        const rodadas = await this.rodadasService.findUserRodadasWithoutScores(user);

        for (const rodada of rodadas) {

            const userRodadaExists = await this.findUserRodada(user.time_id, rodada.rodada_id);

            if (!userRodadaExists) {
                const data = await this.findUserScoreByRodadaCartolaApi(user.time_id, rodada.rodada_id);
                let { pontos_campeonato, pontos, patrimonio } = data;
                let userRodada: CreateUserRodadaDto = {
                    time_id: user.time_id,
                    rodada_id: rodada.rodada_id,
                    pontos_campeonato: pontos_campeonato,
                    pontos: pontos,
                    patrimonio: patrimonio
                }
                await this.create(userRodada);

            }

        }

    }

    async insertAllUserPreviousScores() {

        const users = await this.usersService.findAll();

        let total_rodadas: number = 0;

        for (let user of users) {

            const rodadas = await this.rodadasService.findUserRodadasWithoutScores(user);
            total_rodadas += rodadas.length;
            for (let rodada of rodadas) {
                const data = await this.findUserScoreByRodadaCartolaApi(user.time_id, rodada.rodada_id);
                let { pontos_campeonato, pontos, patrimonio } = data;
                let userRodada: CreateUserRodadaDto = {
                    time_id: user.time_id,
                    rodada_id: rodada.rodada_id,
                    pontos_campeonato: pontos_campeonato,
                    pontos: pontos,
                    patrimonio: patrimonio
                }
                await this.create(userRodada);
            }
        }

        return { message: `Updated ${users.length} user(s) and ${total_rodadas} round(s)` }

    }

    async findUserScoreByRodadaCartolaApi(time_id: number, rodada_id: number) {
        const url = `${URL}/time/id/${time_id}/${rodada_id}`;
        return await this.httpService.axiosRef.get<RodadaPontuacaoResponse>(url)
            .then((response) => response.data)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })
    }


}
