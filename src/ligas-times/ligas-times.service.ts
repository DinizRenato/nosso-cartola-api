import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LigaTime } from './liga-time.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateLigaTimeDto } from './dtos/create-liga-time.dto';
import { CreateLigaDto } from 'src/ligas/dtos/create-liga.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Liga } from 'src/ligas/liga.entity';
import { LigasService } from 'src/ligas/ligas.service';

const URL = 'https://api.cartolafc.globo.com';

@Injectable()
export class LigasTimesService {

    constructor(@InjectRepository(LigaTime) private repository: Repository<LigaTime>,
        private readonly httpService: HttpService,
        private readonly userService: UsersService,
        private readonly ligasService: LigasService) { }

    async create(createLigaTime: CreateLigaTimeDto) {
        const ligaTime = this.repository.create(createLigaTime);
        return await this.repository.save(ligaTime);
    }

    async findLigasTimesBySlug(slug: string, token: string) {

        const response = await this.findLigasTimeBySlugCartolaApi(slug, token);
        const liga: CreateLigaDto = response.data['liga'];
        const times: CreateUserDto[] = response.data['times'];

        let ligaExists = await this.ligasService.findLigaByLigaId(liga.liga_id);

        if (!ligaExists) {
            ligaExists = await this.ligasService.findLigaByLigaId(liga.liga_id);
        }

        for (const time of times) {
            let usersExists = await this.userService.findByTimeId(time.time_id);
            if (!usersExists) {
                usersExists = await this.userService.create(time);
            }
            let newLigaTime: CreateLigaTimeDto = {
                liga: ligaExists,
                time: usersExists,
            }
            await this.create(newLigaTime);
        }

        return this.ligasService.findLigaBySlug(ligaExists.slug);
    }

    private async findLigasTimeBySlugCartolaApi(slug: string, token: string) {
        const url = `${URL}/auth/liga/${slug}`;
        return await this.httpService.axiosRef.get(url,
            { headers: { 'X-GLB-Token': token } })
            .then((response) => response)
            .catch((e) => {
                throw new HttpException(e.response.data, e.response.status);
            })
    }
}
