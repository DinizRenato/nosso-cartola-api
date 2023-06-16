import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { LigasModule } from './ligas/ligas.module';
import { Liga } from './ligas/liga.entity';
import { LigasTimesModule } from './ligas-times/ligas-times.module';
import { LigaTime } from './ligas-times/liga-time.entity';
import { RodadasModule } from './rodadas/rodadas.module';
import { Rodada } from './rodadas/rodada.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Liga, LigaTime, Rodada],
      synchronize: true,
    }),
    UsersModule,
    LigasModule,
    LigasTimesModule,
    RodadasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
