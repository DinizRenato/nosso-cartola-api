import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
