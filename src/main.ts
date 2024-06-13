import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

const port: number | 10000 = Number(process.env.ZONAS_MS_PORT) || 10000;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: 'zones',
      protoPath: join(__dirname, './zones/zones.proto'),
    },
  });
  await app.listen();
}
bootstrap();