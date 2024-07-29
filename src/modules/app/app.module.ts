import { Module } from '@nestjs/common';
import { TodoModule } from '../todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from '../todo/todo.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('db_dialect'),
        host: configService.get('db_host'),
        port: Number(configService.get('db_port')),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [Todo],
      }),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
