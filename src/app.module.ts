import { Module } from '@nestjs/common';
import controllers from './controllers';
import services from './services';
import helpers from './helpers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from './models';
import repositories from './repositories';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME, 
      port: parseInt(process.env.DATABASE_PORT), 
      username: process.env.DATABASE_USERNAME, 
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [...entities],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...repositories]),
  ],
  
  controllers: [...controllers],
  providers: [...services, ...helpers],
})
export class AppModule {}
