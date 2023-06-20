import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRodadasService } from './../users-rodadas/users-rodadas.service';
import { LigaRodada } from './entities/liga-rodada.entity';
import { LigasService } from 'src/ligas/ligas.service';
import { RodadasService } from 'src/rodadas/rodadas.service';

@Injectable()
export class LigasRodadasService {

    constructor(
        @InjectRepository(LigaRodada) private repository: Repository<LigaRodada>,
        private readonly usersRodadaService: UsersRodadasService,
        private readonly ligaService: LigasService,
        private readonly rodadasService: RodadasService
    ) { }

    async create(createLigaRodada: LigaRodada) {
        const ligaRodada = this.repository.create(createLigaRodada);
        return await this.repository.save(ligaRodada);
    }

    async updateAllLigasRounds() {

        const ligas = await this.ligaService.findLigas();

        const rodadas = await this.rodadasService.findFinishedRodadas();

        for (const liga of ligas) {

            for (const rodada of rodadas) {
                const listLigaRodadaScore = await this.usersRodadaService.getLigaRodadaScores(liga.liga_id, rodada.rodada_id);
                for (const ligaRodadaScore of listLigaRodadaScore) {
                    await this.create(ligaRodadaScore);
                }
            }

        }

        return { message: `Updated ${ligas.length} and ${rodadas.length}` };
    }

}
