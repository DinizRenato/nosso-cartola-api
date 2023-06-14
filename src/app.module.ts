import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { LigasModule } from './ligas/ligas.module';
import { Liga } from './ligas/liga.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Liga],
      synchronize: true,
    }),
    UsersModule,
    LigasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
