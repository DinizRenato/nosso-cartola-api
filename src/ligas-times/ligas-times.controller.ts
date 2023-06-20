import { Controller, Get, Param, Headers } from '@nestjs/common';
import { LigasTimesService } from './ligas-times.service';

@Controller('ligas-times')
export class LigasTimesController {

    constructor(private ligasTimesService: LigasTimesService) { }

    @Get('/:slug')
    async findLigaTimesBySlug(@Param('slug') slug: string, @Headers() headers) {
        return this.ligasTimesService.findLigasTimesBySlug(slug, headers['x-glb-token']);
    }

}
