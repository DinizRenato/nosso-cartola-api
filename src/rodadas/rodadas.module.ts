import { Module } from '@nestjs/common';
import { RodadasController } from './rodadas.controller';
import { RodadasService } from './rodadas.service';
import { Rodada } from './entities/rodada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rodada]),
    HttpModule,],
  controllers: [RodadasController],
  providers: [RodadasService],
  exports: [RodadasService]
})
export class RodadasModule { }
