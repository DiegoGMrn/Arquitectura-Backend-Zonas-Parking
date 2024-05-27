import { Controller } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import { ZonesService } from './zones.service';
import { Empty, Zones, inputCreateZone } from './zones.pb';

@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @GrpcMethod('ZonesService', 'findAll')
  findAll(_: Empty): Promise<Zones> {
    const response = this.zonesService.findAll();
    console.log(response);
    return response;
  }

  @GrpcMethod('ZonesService', 'create')
  create(zone: inputCreateZone): Promise<Boolean> {
    return this.zonesService.create(zone);
  }

}
