import { Module } from '@nestjs/common';
import { LigasController } from './ligas.controller';
import { LigasService } from './ligas.service';
import { Liga } from './liga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Liga]), HttpModule],
  controllers: [LigasController],
  providers: [LigasService]
})
export class LigasModule { }
