import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ZonesService } from './zones/zones.service';
import { Zones } from './zones/entities/zones.entity';
import { Repository } from 'typeorm';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    const module = app.get(AppModule);
    expect(module).toBeDefined();
  });

  it('should have a ZonesService instance', () => {
    const zonesService = app.get(ZonesService);
    expect(zonesService).toBeInstanceOf(ZonesService);
  });

  it('should have a ZonesRepository instance', () => {
    const zonesRepository = app.get<Repository<Zones>>(Repository);
    expect(zonesRepository).toBeInstanceOf(Repository);
  });
});