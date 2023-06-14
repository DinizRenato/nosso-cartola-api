import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('int')
    temporada_inicial: number;
    @Column()
    cor_fundo_escudo: string;
    @Column()
    cor_camisa: string;
    @Column()
    cor_borda_escudo: string;
    @Column()
    foto_perfil: string;
    @Column()
    nome_cartola: string;
    @Column()
    globo_id: string;
    @Column()
    nome: string;
    @Column()
    url_escudo_svg: string;
    @Column()
    url_escudo_png: string;
    @Column()
    url_camisa_svg: string;
    @Column()
    url_camisa_png: string;
    @Column({ unique: true })
    slug: string;
    @Column({ nullable: true })
    cor_secundaria_estampa_escudo: string;
    @Column({ nullable: true })
    sorteio_pro_num: string;
    @Column()
    cor_primaria_estampa_camisa: string;
    @Column()
    cor_secundaria_estampa_camisa: string;
    @Column()
    cor_primaria_estampa_escudo: string;
    @Column()
    rodada_time_id: number;
    @Column({ nullable: true })
    facebook_id: string;
    @Column('int')
    tipo_escudo: number;
    @Column('int', { unique: true })
    time_id: number;
    @Column('int8')
    tipo_adorno: number;
    @Column('int8')
    esquema_id: number;
    @Column('int8')
    tipo_estampa_camisa: number;
    @Column('int8')
    tipo_estampa_escudo: number;
    @Column('int8')
    patrocinador1_id: number;
    @Column('int8')
    clube_id: number;
    @Column('int8')
    tipo_camisa: number;
    @Column('int8')
    patrocinador2_id: number;
    @Column()
    assinante: boolean;
    @Column()
    simplificado: boolean;
    @Column()
    cadastro_completo: boolean;
    @Column()
    lgpd_removido: boolean;
    @Column()
    lgpd_quarentena: boolean;

}
