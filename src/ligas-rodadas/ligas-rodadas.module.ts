import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigasModule } from 'src/ligas/ligas.module';
import { RodadasModule } from 'src/rodadas/rodadas.module';
import { UsersRodadasModule } from 'src/users-rodadas/users-rodadas.module';
import { LigaRodada } from './liga-rodada.entity';
import { LigasRodadasController } from './ligas-rodadas.controller';
import { LigasRodadasService } from './ligas-rodadas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LigaRodada]),
    LigasModule,
    RodadasModule,
    UsersRodadasModule
  ],
  controllers: [LigasRodadasController],
  providers: [LigasRodadasService],
})
export class LigasRodadasModule { }
