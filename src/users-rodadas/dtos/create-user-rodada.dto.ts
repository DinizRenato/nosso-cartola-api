import { Rodada } from "src/rodadas/rodada.entity";
import { User } from "src/users/user.entity";

export class CreateUserRodadaDto {
    rodada: Rodada;
    time: User;
    pontos: number;
    patrimonio: number;
    pontos_campeonato: number;
}
