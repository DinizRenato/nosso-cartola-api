import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRodada } from './user-rodada.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateUserRodadaDto } from './dtos/create-user-rodada.dto';
import { UsersService } from 'src/users/users.service';
import { RodadasService } from 'src/rodadas/rodadas.service';
import { Rodada } from 'src/rodadas/rodada.entity';
import { User } from 'src/users/user.entity';

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

    async findUserRodada(time: User, rodada: Rodada) {

        const userRodada = this.repository.findOne({
            where: {
                time: time,
                rodada: rodada
            }
        });
        return userRodada;
    }

    async insertLoggedUserAllScorePreviousRounds(token: string) {
        const user = await this.usersService.findLoggedUser(token);
        const rodadas = await this.rodadasService.findFinishedRodadas();

        for (const rodada of rodadas) {

            const userRodadaExists = await this.findUserRodada(user, rodada);

            if (!userRodadaExists) {
                const data = await this.findUserScoreByRodadaCartolaApi(user.time_id, rodada.rodada_id);
                let { pontos_campeonato, pontos, patrimonio } = data;
                let userRodada: CreateUserRodadaDto = {
                    rodada: rodada,
                    time: user,
                    pontos_campeonato: pontos_campeonato,
                    pontos: pontos,
                    patrimonio: patrimonio
                }
                await this.create(userRodada);

            }

        }

    }

    async findUserScoreByRodadaCartolaApi(time_id: number, rodada_id: number) {
        const url = `${URL}/time/id/${time_id}/${rodada_id}`;
        return await this.httpService.axiosRef.get<RodadaPontuacaoResponse>(url).then((response) => response.data)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })
    }


}
