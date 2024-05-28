import { Controller } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import { ZonesService } from './zones.service';
import { CreateZoneResponse, Empty, Zones, inputCreateZone, inputDeleteZone } from './zones.pb';

@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @GrpcMethod('ZonesService', 'findAll')
  findAll(_: Empty): Promise<Zones> {
    const response = this.zonesService.findAll();
    console.log(response);
    return response;
  }
  /*
  @GrpcMethod('ZonesService', 'create')
  create(zone: inputCreateZone): Promise<Boolean> {
    console.log(zone)
    return this.zonesService.create(zone);
  }*/
  @GrpcMethod('ZonesService', 'createZone')
  async create(zone: inputCreateZone): Promise<boolean> {
    const response = await this.zonesService.create(zone);
    return response.success; // Retorna el valor booleano de success
  }

  @GrpcMethod('ZonesService', 'delete')
  delete(zone: inputDeleteZone): Promise<Boolean> {
    return this.zonesService.delete(zone);
  }

}
