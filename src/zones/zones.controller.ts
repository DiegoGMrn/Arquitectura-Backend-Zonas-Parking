import { Controller } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import { ZonesService } from './zones.service';
import { CreateZoneResponse, Empty, Zones, arrayZones, inputCreateZone, inputDeleteZone, inputFindMultipleZones, inputFindOne } from './zones.pb';

@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @GrpcMethod('ZonesService', 'findAll')
  async findAll(_: Empty): Promise<arrayZones> {
    const response = await this.zonesService.findAll();
    return response;
  }
  
  @GrpcMethod('ZonesService', 'create')
  async create(zone: inputCreateZone): Promise<CreateZoneResponse> {
    const response = await this.zonesService.create(zone);
    return response;
  }
  /*@GrpcMethod('ZonesService', 'createZone')
  async create(zone: inputCreateZone): Promise<boolean> {
    const response = await this.zonesService.create(zone);
    return response.success; 
  }*/

  @GrpcMethod('ZonesService', 'delete')
  delete(zone: inputDeleteZone): Promise<Boolean> {
    return this.zonesService.delete(zone);
  }

  @GrpcMethod('ZonesService', 'updateAvailableSpots')
  updateAvailableSpots(data: any): Promise<any> {
    return this.zonesService.updateAvailableSpots(data);
  }

  @GrpcMethod('ZonesService', 'findOne')
  findOne(idZone: inputFindOne): Promise<Zones> {
    return this.zonesService.findOne(idZone);
  }

  @GrpcMethod('ZonesService', 'findMultiple')
  async findMultiple(data: inputFindMultipleZones): Promise<arrayZones> {
    const response = await this.zonesService.findMultiple(data.ids);
    return response;
  }


}
