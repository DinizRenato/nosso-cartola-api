import { Controller, Get, Headers } from '@nestjs/common';
import { UsersRodadasService } from './users-rodadas.service';

@Controller('users-rodadas')
export class UsersRodadasController {

    constructor(private usersRodadaService: UsersRodadasService) { }

    @Get()
    async allScorePreviousRounds(@Headers() headers) {
        await this.usersRodadaService.insertLoggedUserAllScorePreviousRounds(headers['x-glb-token']);
        return null;
    }

    @Get('/updateUsers')
    async updateAllUsers() {
        const message = await this.usersRodadaService.insertAllUserPreviousScores();
        return message;
    }
}
