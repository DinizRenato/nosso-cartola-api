import { User } from "src/users/entities/user.entity";
import { LigaTime } from "../../ligas-times/entities/liga-time.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('ligas')
export class Liga {

    @PrimaryColumn()
    liga_id: number;

    @Column('int', { nullable: true })
    time_dono_id: number;

    @Column({ nullable: true })
    clube_id: string;

    @Column()
    nome: string;
    @Column()
    descricao: string;

    @Column()
    slug: string;

    @Column()
    tipo: string;

    @Column()
    mata_mata: boolean;

    @Column()
    editorial: boolean;

    @Column()
    patrocinador: boolean;

    @Column()
    criacao: Date;

    @Column()
    sem_capitao: boolean;

    @Column('int')
    tipo_flamula: number;

    @Column('int', { nullable: true })
    tipo_estampa_flamula: number;

    @Column('int', { nullable: true })
    tipo_adorno_flamula: number;

    @Column()
    cor_primaria_estampa_flamula: string;

    @Column()
    cor_secundaria_estampa_flamula: string;

    @Column({ nullable: true })
    cor_borda_flamula: string;

    @Column({ nullable: true })
    cor_fundo_flamula: string;

    @Column({ nullable: true })
    url_flamula_svg: string;

    @Column({ nullable: true })
    url_flamula_png: string;

    @Column({ nullable: true })
    tipo_trofeu: string;

    @Column({ nullable: true })
    cor_trofeu: string;

    @Column({ nullable: true })
    url_trofeu_svg: string;

    @Column({ nullable: true })
    url_trofeu_png: string;

    @Column('int')
    inicio_rodada: number;

    @Column('int', { nullable: true })
    fim_rodada: number;

    @Column('int', { nullable: true })
    quantidade_times: number;

    @Column()
    sorteada: boolean;

    @Column()
    imagem: string;

    @Column({ default: false })
    atualiza: boolean;

    // @OneToMany(() => LigaTime, times => times.liga, {
    //     cascade: true
    // })
    // times: LigaTime;
    times: User[] = [];

}
