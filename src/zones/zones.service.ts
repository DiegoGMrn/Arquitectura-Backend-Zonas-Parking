import { Injectable } from '@nestjs/common';
import { CreateZoneResponse, inputCreateZone, inputDeleteZone } from './zones.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { Zones } from './entities/zones.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonesService {
  constructor(@InjectRepository(Zones) private readonly zonesRepository: Repository<Zones>) {}
  public async findAll(): Promise<Zones> {
    const zone: Zones = {
      id: 1,
      name: 'Zona 1',
      cantEstacionamientosTotales: 100,
      cantEstacionamientosOcupados: 50,
    }

    return zone;
  }
  /*
  public async create(zone: inputCreateZone): Promise<Boolean> {
    try {
      await this.zonesRepository.save(zone);
      return true;
    } catch (error) {
      return false;
    }
  }*/
  public async create(zone: inputCreateZone): Promise<CreateZoneResponse> {
    try {
      await this.zonesRepository.save(zone);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  public async delete(zone: inputDeleteZone): Promise<Boolean> {
    try {
      await this.zonesRepository.delete(zone.id);
      return true;
    } catch (error) {
      return false;
    }
  }


}
