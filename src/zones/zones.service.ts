import { Injectable } from '@nestjs/common';
import { CreateZoneResponse, UpdateAvailableSpotsRequest, UpdateAvailableSpotsResponse, arrayZones, inputCreateZone, inputDeleteZone, inputFindOne } from './zones.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { Zones } from './entities/zones.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ZonesService {
  constructor(@InjectRepository(Zones) private readonly zonesRepository: Repository<Zones>) {}
  public async findAll(): Promise<arrayZones> {
    const zones = await this.zonesRepository.find();
    const response: arrayZones = {
      zones: zones,
    }
    return response;

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

  public async findMultiple(zoneIds: number[]): Promise<arrayZones> {
    const response = await this.zonesRepository.find({
      where: {
        id: In(zoneIds),
      },
    });
    console.log(response);
    const arrayZones: arrayZones = {
      zones: response,
    }
    return arrayZones
  }

  public async reduceReservedSpots(data: any): Promise<any> {
    const queryRunner = this.zonesRepository.manager.connection.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const zone = await queryRunner.manager.findOne(Zones, { where: { id: data.zoneId }});
      if (!zone || zone.cantEstacionamientosOcupados <= 0) {
        throw new Error('No parking spots to reduce');
      }

      zone.cantEstacionamientosOcupados -= 1;
      await queryRunner.manager.save(zone);

      await queryRunner.commitTransaction();
      const response = {
        success: true,
      }
      return response;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      const response = {
        success: false,
      }
      return response;
    } finally {
      await queryRunner.release();
    }
  }


}
