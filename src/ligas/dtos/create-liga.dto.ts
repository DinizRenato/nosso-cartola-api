export class CreateLigaDto {

    liga_id: number;
    time_dono_id: number;
    clube_id: string;
    nome: string;
    descricao: string;
    slug: string;
    tipo: string;
    mata_mata: boolean;
    editorial: boolean;
    patrocinador: boolean;
    criacao: Date;
    sem_capitao: boolean;
    tipo_flamula: number;
    tipo_estampa_flamula: number;
    tipo_adorno_flamula: number;
    cor_primaria_estampa_flamula: string;
    cor_secundaria_estampa_flamula: string;
    cor_borda_flamula: string;
    cor_fundo_flamula: string;
    url_flamula_svg: string;
    url_flamula_png: string;
    tipo_trofeu: string;
    cor_trofeu: string;
    url_trofeu_svg: string;
    url_trofeu_png: string;
    inicio_rodada: number;
    fim_rodada: number;
    quantidade_times: number;
    sorteada: boolean;
    imagem: string;

}
