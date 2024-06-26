import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonesModule } from './zones/zones.module';
import { Zones } from './zones/entities/zones.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.ZONAS_DB_HOST,
      port: Number(process.env.ZONAS_DB_PORT),
      username: process.env.ZONAS_DB_USERNAME,
      password: process.env.ZONAS_DB_PASSWORD,
      database: process.env.ZONAS_DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      useUTC: true,
      entities: [Zones],
    }),
    ZonesModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
