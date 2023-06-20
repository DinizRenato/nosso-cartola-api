import { UserRodada } from "src/users-rodadas/entities/user-rodada.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('rodadas')
export class Rodada {

    @PrimaryColumn()
    rodada_id: number;
    @Column()
    inicio: Date;
    @Column()
    fim: Date;
    @Column()
    nome_rodada: string;
    @OneToMany(() => UserRodada, times => times.rodada_id)
    times;
}
