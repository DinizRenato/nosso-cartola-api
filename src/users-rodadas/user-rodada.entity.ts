import { Rodada } from "src/rodadas/rodada.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_rodadas')
export class UserRodada {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Rodada, rodada => rodada.times)
    rodada: Rodada;
    @ManyToOne(() => User, user => user.pontos)
    time: User;
    @Column('decimal')
    pontos: number;
    @Column('decimal')
    patrimonio: number;
    @Column('decimal')
    pontos_campeonato: number;

}
