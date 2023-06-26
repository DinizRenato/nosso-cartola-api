import { ClassSerializerInterceptor, Controller, Get, Headers, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async timeLogado(@Headers() headers) {
        const user = await this.usersService.findLoggedUser(headers['x-glb-token']);
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:time_id')
    async findUserByTimeId(@Param('time_id') time_id: number) {
        const user = await this.usersService.findUserByIdWithLigas(time_id);
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/slug/:slug')
    async findUserBySlug(@Param('slug') slug: string) {
        const user = await this.usersService.findByTimeSlug(slug);
        return user;
    }

}
