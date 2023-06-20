import { LigasRodadasService } from './ligas-rodadas.service';
import { Controller, Get } from '@nestjs/common';

@Controller('ligas-rodadas')
export class LigasRodadasController {
    constructor(private ligasRodadasService: LigasRodadasService) { }

    @Get()
    async updateLigasScores() {
        await this.ligasRodadasService.updateAllLigasRounds(2449165, 1);
        return { message: 'update scores' };
    }
}
