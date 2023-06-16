import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigasModule } from 'src/ligas/ligas.module';
import { UsersModule } from 'src/users/users.module';
import { LigaTime } from './liga-time.entity';
import { LigasTimesController } from './ligas-times.controller';
import { LigasTimesService } from './ligas-times.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LigaTime]),
    HttpModule,
    UsersModule,
    LigasModule],
  controllers: [LigasTimesController],
  providers: [LigasTimesService]
})
export class LigasTimesModule { }
