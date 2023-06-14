import { Controller, Get, Headers, Param } from '@nestjs/common';
import { LigasService } from './ligas.service';

@Controller('ligas')
export class LigasController {

    constructor(private ligasService: LigasService) { }

    @Get()
    async ligasLoggedUser(@Headers() headers) {
        const ligas = await this.ligasService.findLoggedUserLigas(headers['x-glb-token']);
        return ligas;
    }

    @Get('/:liga_id')
    async findLigaByLigaId(@Param('liga_id') liga_id: number) {
        const liga = await this.ligasService.findLigaByLigaId(liga_id);
        return liga;
    }
    @Get('/slug/:slug')
    async findLigaBySlug(@Param('slug') slug: string) {
        const liga = await this.ligasService.findLigaBySlug(slug);
        return liga;
    }
}
