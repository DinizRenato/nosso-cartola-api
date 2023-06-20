import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRodada } from './entities/user-rodada.entity';
import { UsersRodadasController } from './users-rodadas.controller';
import { UsersRodadasService } from './users-rodadas.service';
import { UsersModule } from 'src/users/users.module';
import { RodadasModule } from 'src/rodadas/rodadas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRodada]),
    HttpModule,
    UsersModule,
    RodadasModule],
  controllers: [UsersRodadasController],
  providers: [UsersRodadasService],
  exports: [UsersRodadasService]
})
export class UsersRodadasModule { }
