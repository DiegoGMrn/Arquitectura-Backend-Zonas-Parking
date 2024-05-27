import { Injectable } from '@nestjs/common';
import { Empty, Zones } from './zones.pb';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class ZonesService {
  public async findAll(): Promise<Zones> {
    const zone: Zones = {
      id: 1,
      name: 'Zona 1',
      cant_estacionamientos_totales: '100',
      cant_estacionamientos_ocupados: 50,
    }

    return zone;
  }
}
