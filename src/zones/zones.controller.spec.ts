
import { Test, TestingModule } from '@nestjs/testing';
import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { CreateZoneResponse, UpdateAvailableSpotsRequest, UpdateAvailableSpotsResponse, Zones, arrayZones, inputCreateZone, inputDeleteZone, inputFindMultipleZones, inputFindOne } from './zones.pb';

describe('ZonesController', () => {
  let controller: ZonesController;
  let service: ZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonesController],
      providers: [
        {
          provide: ZonesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            updateAvailableSpots: jest.fn(),
            findOne: jest.fn(),
            findMultiple: jest.fn(),
            reduceReservedSpots: jest.fn(),
          },
        },
        {
          provide: ZonesController,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            updateAvailableSpots: jest.fn(),
            findOne: jest.fn(),
            findMultiple: jest.fn(),
            reduceReservedSpots: jest.fn(),
          },
        },
        {
          provide: 'ZonesRepository',
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],

    }).compile();

    controller = module.get<ZonesController>(ZonesController);
    service = module.get<ZonesService>(ZonesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call zonesService.findAll and return the response', async () => {
      const expectedResponse: arrayZones = { 
        zones: 
        [{id: 1, name: 'Zone 1', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0}, 
        {id: 2, name: 'Zone 2', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0}]};

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResponse);

      const response = await controller.findAll({});

      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should call zonesService.create with the provided zone and return the response', async () => {
      const zone: inputCreateZone = { name: 'Zone 1', cantEstacionamientosTotales: 30};
      const expectedResponse: CreateZoneResponse = { success: true};
      jest.spyOn(service, 'create').mockResolvedValue(expectedResponse);

      const response = await controller.create(zone);

      expect(service.create).toHaveBeenCalledWith(zone);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('delete', () => {
    it('should call zonesService.delete with the provided zone and return the response', async () => {
      const zone: inputDeleteZone = { id: 1 };
      const expectedResponse: boolean = true;
      jest.spyOn(service, 'delete').mockResolvedValue(expectedResponse);

      const response = await controller.delete(zone);

      expect(service.delete).toHaveBeenCalledWith(zone);
      expect(response).toEqual(expectedResponse);
    });
  });
 
  describe('updateAvailableSpots', () => {
    it('should call zonesService.updateAvailableSpots with the provided data and return the response', async () => {
      const data: UpdateAvailableSpotsRequest = { zoneId: 1}; 
      const expectedResponse: UpdateAvailableSpotsResponse = {success: true}; 
      jest.spyOn(service, 'updateAvailableSpots').mockResolvedValue(expectedResponse);
  
      const response = await controller.updateAvailableSpots(data);
  
      expect(service.updateAvailableSpots).toHaveBeenCalledWith(data);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should call zonesService.findOne with the provided zone ID and return the response', async () => {
      const zoneId: inputFindOne = { id: 1 };
      const expectedResponse: Zones = {
        id: 1,
        name: 'Zone 1',
        cantEstacionamientosTotales: 30,
        cantEstacionamientosOcupados: 0,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResponse);
  
      const response = await controller.findOne(zoneId);
  
      expect(service.findOne).toHaveBeenCalledWith(zoneId);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findMultiple', () => {
    it('should call zonesService.findMultiple with the provided data and return the response', async () => {
      const data: inputFindMultipleZones = { ids: [1, 2, 3] };
      const expectedResponse: arrayZones = {
        zones: [
          { id: 1, name: 'Zone 1', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
          { id: 2, name: 'Zone 2', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
          { id: 3, name: 'Zone 3', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
        ],
      };
      jest.spyOn(service, 'findMultiple').mockResolvedValue(expectedResponse);
  
      const response = await controller.findMultiple(data);
  
      expect(service.findMultiple).toHaveBeenCalledWith(data.ids);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('reduceReservedSpots', () => {
    it('should call zonesService.reduceReservedSpots with the provided data and return the response', async () => {
      const data: any = {zoneid: 1}; 
      const expectedResponse: any = { success: true }; 
      jest.spyOn(service, 'reduceReservedSpots').mockResolvedValue(expectedResponse);
  
      const response = await controller.reduceReservedSpots(data);
  
      expect(service.reduceReservedSpots).toHaveBeenCalledWith(data);
      expect(response).toEqual(expectedResponse);
    });
  });
  
});
