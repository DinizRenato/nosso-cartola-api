import { Controller, Get, Param, Headers, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LigasTimesService } from './ligas-times.service';

@Controller('ligas-times')
export class LigasTimesController {

    constructor(private ligasTimesService: LigasTimesService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:slug')
    async findLigaTimesBySlug(@Param('slug') slug: string, @Headers() headers) {
        return this.ligasTimesService.findLigasTimesBySlug(slug, headers['x-glb-token']);
    }

}
