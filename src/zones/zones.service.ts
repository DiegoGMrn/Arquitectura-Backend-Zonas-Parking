import { Injectable } from '@nestjs/common';
import { CreateZoneResponse, UpdateAvailableSpotsRequest, UpdateAvailableSpotsResponse, inputCreateZone, inputDeleteZone, inputFindOne } from './zones.pb';
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
  
  public async create(zone: inputCreateZone): Promise<CreateZoneResponse> {
    try {
      await this.zonesRepository.save(zone);
      const response: CreateZoneResponse = {
        success: true,
      }
      return response;
    } catch (error) {
      console.log(error);
      const response: CreateZoneResponse = {
        success: false,
      }
      return response;
    }
  }
  /*public async create(zone: inputCreateZone): Promise<CreateZoneResponse> {
    try {
      await this.zonesRepository.save(zone);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }*/

  public async delete(zone: inputDeleteZone): Promise<Boolean> {
    try {
      await this.zonesRepository.delete(zone.id);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async updateAvailableSpots(UpdateAvailableSpotsRequest: UpdateAvailableSpotsRequest): Promise<UpdateAvailableSpotsResponse> {
    const queryRunner = this.zonesRepository.manager.connection.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const zone = await queryRunner.manager.findOne(Zones, { where: { id: UpdateAvailableSpotsRequest.zoneId }});
      if (!zone || zone.cantEstacionamientosOcupados >= zone.cantEstacionamientosTotales) {
        throw new Error('No available parking spots');
      }

      zone.cantEstacionamientosOcupados += 1;
      await queryRunner.manager.save(zone);

      await queryRunner.commitTransaction();
      const response: UpdateAvailableSpotsResponse = {
        success: true,
      }
      return response;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      const response: UpdateAvailableSpotsResponse = {
        success: false,
      }
      return response;
    } finally {
      await queryRunner.release();
    }
  }

  public async findOne(idZone: inputFindOne): Promise<Zones> {
    return this.zonesRepository.findOne({ where: { id: idZone.id }});
  }


}
