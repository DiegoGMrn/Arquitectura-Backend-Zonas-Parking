import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @MessagePattern('createZone')
  create(@Payload() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @MessagePattern('findAllZones')
  findAll() {
    return this.zonesService.findAll();
  }

  @MessagePattern('findOneZone')
  findOne(@Payload() id: number) {
    return this.zonesService.findOne(id);
  }

  @MessagePattern('updateZone')
  update(@Payload() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(updateZoneDto.id, updateZoneDto);
  }

  @MessagePattern('removeZone')
  remove(@Payload() id: number) {
    return this.zonesService.remove(id);
  }
}
