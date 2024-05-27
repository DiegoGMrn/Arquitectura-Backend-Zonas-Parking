import { Injectable } from '@nestjs/common';
import { Zones } from './zones.pb';

@Injectable()
export class ZonesService {
  public async findAll(): Promise<Zones> {
    const zone: Zones = {
      id: 1,
      name: 'Zona 1',
      cantEstacionamientosTotales: 100,
      cantEstacionamientosOcupados: 50,
    }

    return zone;
  }
}
