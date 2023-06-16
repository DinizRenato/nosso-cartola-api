import { Controller, Get } from '@nestjs/common';
import { RodadasService } from './rodadas.service';

@Controller('rodadas')
export class RodadasController {

    constructor(private rodadasService: RodadasService) { }

    @Get()
    async findRodadas() {
        return await this.rodadasService.findRodadas();
    }
}
