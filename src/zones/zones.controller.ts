import { Controller } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import { ZonesService } from './zones.service';
import { Empty, Zones } from './zones.pb';

@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @GrpcMethod('ZonesService', 'findAll')
  findAll(_: Empty): Promise<Zones> {
    const response = this.zonesService.findAll();
    console.log(response);
    return response;
  }

}
