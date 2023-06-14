import { Controller, Get, Headers, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    async timeLogado(@Headers() headers) {
        const user = await this.usersService.findLoggedUser(headers['x-glb-token']);
        return user;
    }

    @Get('/:time_id')
    async findUserByTimeId(@Param('time_id') time_id: number) {
        const user = await this.usersService.findByTimeId(time_id);
        return user;
    }

    @Get('/slug/:slug')
    async findUserBySlug(@Param('slug') slug: string) {
        const user = await this.usersService.findByTimeSlug(slug);
        return user;
    }

}
