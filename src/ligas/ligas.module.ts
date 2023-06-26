import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Liga } from './entities/liga.entity';
import { LigasController } from './ligas.controller';
import { LigasService } from './ligas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Liga]),
    HttpModule,
    forwardRef(() => UsersModule)
  ],
  controllers: [LigasController],
  providers: [LigasService],
  exports: [LigasService]
})
export class LigasModule { }
