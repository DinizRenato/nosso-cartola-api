import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('ligas_rodadas')
export class LigaRodada {

    @PrimaryColumn()
    liga_id: number;
    @PrimaryColumn()
    time_id: number;
    @PrimaryColumn()
    rodada_id: number;
    @Column('decimal')
    pontos: number;
    @Column('decimal')
    patrimonio: number;
    @Column('decimal')
    pontos_campeonato: number;
    @Column('int')
    rnk_pontos: number;
    @Column('int')
    rnk_patrimonio: number;
    @Column('int')
    rnk_pontos_campeonato: number;

}
