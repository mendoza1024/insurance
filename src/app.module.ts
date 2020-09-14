import { Module } from '@nestjs/common';
import controllers from './controllers';
import services from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from './models';
import repositories from './repositories';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME, //'localhost',
      port: parseInt(process.env.DATABASE_PORT), //5432,
      username: process.env.DATABASE_USERNAME, //'postgres',
      password: process.env.DATABASE_PASSWORD,//'mysecretpassword',
      database: process.env.DATABASE_NAME,//'policy',
      entities: [...entities],
      synchronize: true,
//      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([...repositories]),
  ],
  
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule {}
