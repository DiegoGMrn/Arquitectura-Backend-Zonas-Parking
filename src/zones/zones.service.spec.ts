import { Test, TestingModule } from '@nestjs/testing';
import { ZonesService } from './zones.service';
import { Zones } from './entities/zones.entity';
import { CreateZoneResponse, UpdateAvailableSpotsRequest, UpdateAvailableSpotsResponse, arrayZones, inputCreateZone, inputDeleteZone, inputFindMultipleZones, inputFindOne } from './zones.pb';
import { Connection, DataSource, EntityManager, In, QueryRunner, ReplicationMode, Repository, Table, TableCheck, TableColumn, TableExclusion, TableForeignKey, TableIndex, TableUnique, View } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReadStream } from 'fs';
import { SqlInMemory } from 'typeorm/driver/SqlInMemory';
import { Broadcaster } from 'typeorm/subscriber/Broadcaster';

const mockZones: arrayZones = { 
  zones: [
    { id: 1, name: 'Zone 1', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 1 }, 
    { id: 2, name: 'Zone 2', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 1 }
  ]
};

describe('ZonesService', () => {
  let service: ZonesService;
  let zonesRepository: Repository<Zones>;

  const mockQueryRunner: QueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    manager: {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as EntityManager,
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    query: jest.fn(),
    connection: {} as Connection,
    isReleased: false,
    isTransactionActive: false,
    data: undefined,
    loadedTables: [],
    loadedViews: [],
    beforeMigration: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    afterMigration: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    clearDatabase: function (database?: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    stream: function (query: string, parameters?: any[], onEnd?: Function, onError?: Function): Promise<ReadStream> {
      throw new Error('Function not implemented.');
    },
    getDatabases: function (): Promise<string[]> {
      throw new Error('Function not implemented.');
    },
    getSchemas: function (database?: string): Promise<string[]> {
      throw new Error('Function not implemented.');
    },
    getTable: function (tablePath: string): Promise<Table> {
      throw new Error('Function not implemented.');
    },
    getTables: function (tablePaths?: string[]): Promise<Table[]> {
      throw new Error('Function not implemented.');
    },
    getView: function (viewPath: string): Promise<View> {
      throw new Error('Function not implemented.');
    },
    getViews: function (viewPaths?: string[]): Promise<View[]> {
      throw new Error('Function not implemented.');
    },
    getReplicationMode: function (): ReplicationMode {
      throw new Error('Function not implemented.');
    },
    hasDatabase: function (database: string): Promise<boolean> {
      throw new Error('Function not implemented.');
    },
    getCurrentDatabase: function (): Promise<string> {
      throw new Error('Function not implemented.');
    },
    hasSchema: function (schema: string): Promise<boolean> {
      throw new Error('Function not implemented.');
    },
    getCurrentSchema: function (): Promise<string> {
      throw new Error('Function not implemented.');
    },
    hasTable: function (table: string | Table): Promise<boolean> {
      throw new Error('Function not implemented.');
    },
    hasColumn: function (table: string | Table, columnName: string): Promise<boolean> {
      throw new Error('Function not implemented.');
    },
    createDatabase: function (database: string, ifNotExist?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropDatabase: function (database: string, ifExist?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createSchema: function (schemaPath: string, ifNotExist?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropSchema: function (schemaPath: string, ifExist?: boolean, isCascade?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createTable: function (table: Table, ifNotExist?: boolean, createForeignKeys?: boolean, createIndices?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropTable: function (table: string | Table, ifExist?: boolean, dropForeignKeys?: boolean, dropIndices?: boolean): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createView: function (view: View, syncWithMetadata?: boolean, oldView?: View): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropView: function (view: string | View): Promise<void> {
      throw new Error('Function not implemented.');
    },
    renameTable: function (oldTableOrName: string | Table, newTableName: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    changeTableComment: function (tableOrName: string | Table, comment?: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    addColumn: function (table: string | Table, column: TableColumn): Promise<void> {
      throw new Error('Function not implemented.');
    },
    addColumns: function (table: string | Table, columns: TableColumn[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    renameColumn: function (table: string | Table, oldColumnOrName: string | TableColumn, newColumnOrName: string | TableColumn): Promise<void> {
      throw new Error('Function not implemented.');
    },
    changeColumn: function (table: string | Table, oldColumn: string | TableColumn, newColumn: TableColumn): Promise<void> {
      throw new Error('Function not implemented.');
    },
    changeColumns: function (table: string | Table, changedColumns: { oldColumn: TableColumn; newColumn: TableColumn; }[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropColumn: function (table: string | Table, column: string | TableColumn): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropColumns: function (table: string | Table, columns: string[] | TableColumn[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createPrimaryKey: function (table: string | Table, columnNames: string[], constraintName?: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatePrimaryKeys: function (table: string | Table, columns: TableColumn[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropPrimaryKey: function (table: string | Table, constraintName?: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createUniqueConstraint: function (table: string | Table, uniqueConstraint: TableUnique): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createUniqueConstraints: function (table: string | Table, uniqueConstraints: TableUnique[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropUniqueConstraint: function (table: string | Table, uniqueOrName: string | TableUnique): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropUniqueConstraints: function (table: string | Table, uniqueConstraints: TableUnique[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createCheckConstraint: function (table: string | Table, checkConstraint: TableCheck): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createCheckConstraints: function (table: string | Table, checkConstraints: TableCheck[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropCheckConstraint: function (table: string | Table, checkOrName: string | TableCheck): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropCheckConstraints: function (table: string | Table, checkConstraints: TableCheck[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createExclusionConstraint: function (table: string | Table, exclusionConstraint: TableExclusion): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createExclusionConstraints: function (table: string | Table, exclusionConstraints: TableExclusion[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropExclusionConstraint: function (table: string | Table, exclusionOrName: string | TableExclusion): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropExclusionConstraints: function (table: string | Table, exclusionConstraints: TableExclusion[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createForeignKey: function (table: string | Table, foreignKey: TableForeignKey): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createForeignKeys: function (table: string | Table, foreignKeys: TableForeignKey[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropForeignKey: function (table: string | Table, foreignKeyOrName: string | TableForeignKey): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropForeignKeys: function (table: string | Table, foreignKeys: TableForeignKey[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createIndex: function (table: string | Table, index: TableIndex): Promise<void> {
      throw new Error('Function not implemented.');
    },
    createIndices: function (table: string | Table, indices: TableIndex[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropIndex: function (table: string | Table, index: string | TableIndex): Promise<void> {
      throw new Error('Function not implemented.');
    },
    dropIndices: function (table: string | Table, indices: TableIndex[]): Promise<void> {
      throw new Error('Function not implemented.');
    },
    clearTable: function (tableName: string): Promise<void> {
      throw new Error('Function not implemented.');
    },
    enableSqlMemory: function (): void {
      throw new Error('Function not implemented.');
    },
    disableSqlMemory: function (): void {
      throw new Error('Function not implemented.');
    },
    clearSqlMemory: function (): void {
      throw new Error('Function not implemented.');
    },
    getMemorySql: function (): SqlInMemory {
      throw new Error('Function not implemented.');
    },
    executeMemoryUpSql: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    executeMemoryDownSql: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    broadcaster: jest.fn() as unknown as Broadcaster,
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZonesService,
        {
          provide: getRepositoryToken(Zones),
          useValue: {
            find: jest.fn().mockResolvedValue(mockZones.zones),
            save: jest.fn().mockResolvedValue(mockZones.zones[0]),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            findOne: jest.fn().mockResolvedValue(mockZones.zones[0]),
            manager: {
              connection: {
                createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<ZonesService>(ZonesService);
    zonesRepository = module.get<Repository<Zones>>(getRepositoryToken(Zones));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of zones', async () => {
      const expectedResponse: arrayZones = mockZones;

      const result = await service.findAll();

      expect(result).toEqual(expectedResponse);
      expect(zonesRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new zone', async () => {
      const zone: inputCreateZone = { name: 'Zone 1', cantEstacionamientosTotales: 30 };
      const expectedResponse: CreateZoneResponse = { success: true };

      jest.spyOn(zonesRepository, 'save').mockResolvedValue({ id: 1, ...zone, cantEstacionamientosOcupados: 0 });
    
      
      const result = await service.create(zone);

      expect(result).toEqual(expectedResponse);
      expect(zonesRepository.save).toHaveBeenCalledTimes(1);
      expect(zonesRepository.save).toHaveBeenCalledWith(zone);
    });

    it('should handle error when failed to create a zone', async () => {
      const zone: inputCreateZone = { name: 'Zone 1', cantEstacionamientosTotales: 30 };
      const expectedResponse: CreateZoneResponse = { success: false };

      jest.spyOn(zonesRepository, 'save').mockRejectedValue(new Error('Failed to create zone'));

      const result = await service.create(zone);

      expect(result).toEqual(expectedResponse);
      expect(zonesRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a zone', async () => {
      const zone: inputDeleteZone = { id: 1 };
      const expectedResponse: boolean = true;

      jest.spyOn(zonesRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });

      const result = await service.delete(zone);
      
      expect(result).toBe(expectedResponse);
      expect(zonesRepository.delete).toHaveBeenCalledTimes(1);
      expect(zonesRepository.delete).toHaveBeenCalledWith(zone.id);
    });

    it('should handle error when failed to delete a zone', async () => {
      const zone: inputDeleteZone = { id: 0 };
      const expectedResponse: boolean = false;

      jest.spyOn(zonesRepository, 'delete').mockRejectedValue(new Error('Failed to delete zone'));

      const result = await service.delete(zone);

      expect(result).toBe(expectedResponse);
      expect(zonesRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateAvailableSpots', () => {
    it('should update available spots for a zone', async () => {
      const data: UpdateAvailableSpotsRequest = { zoneId: 4 }; 
      const expectedResponse: UpdateAvailableSpotsResponse = { success: true };

      jest.spyOn(zonesRepository.manager.connection, 'createQueryRunner').mockReturnValue(mockQueryRunner);
      jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(mockZones.zones[0]);
      jest.spyOn(mockQueryRunner.manager, 'save').mockResolvedValue(mockZones.zones[0]);

      const result = await service.updateAvailableSpots(data);

      expect(result).toEqual(expectedResponse);
      expect(mockQueryRunner.connect).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalledWith(Zones, { where: { id: data.zoneId } });
      expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);
    });

    it('should handle error when failed to update available spots for a zone', async () => {
      const data: UpdateAvailableSpotsRequest = { zoneId: 0 }; 
      const expectedResponse: UpdateAvailableSpotsResponse = {
        success: false,
        message: 'Zone not found',
      };

      jest.spyOn(zonesRepository.manager.connection, 'createQueryRunner').mockReturnValue(mockQueryRunner);
      jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(null);

      const result = await service.updateAvailableSpots(data);

      expect(result).toEqual(expectedResponse);
      expect(mockQueryRunner.connect).toHaveBeenCalledTimes(2);
      expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(2);
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalledWith(Zones, { where: { id: data.zoneId } });
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.release).toHaveBeenCalledTimes(2);
    });
  });

  describe('findOne', () => {
    it('should find a zone by ID', async () => {
      const zoneId: inputFindOne = { id: 1 };
      const expectedResponse: Zones = mockZones.zones[0];

      jest.spyOn(zonesRepository, 'findOne').mockResolvedValue(expectedResponse);

      const result = await service.findOne(zoneId);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(zonesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(zonesRepository.findOne).toHaveBeenCalledWith({"where": {"id": zoneId.id}});
    });

    it('should handle error when zone not found by ID', async () => {
      const zoneId: inputFindOne = { id: 0 };
      const expectedResponse = null;

      jest.spyOn(zonesRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(zoneId);

      expect(result).toBeNull();
      expect(zonesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(zonesRepository.findOne).toHaveBeenCalledWith({"where": {"id": zoneId.id}});
    });
  });

  describe('findMultiple', () => {
    it('should find multiple zones by IDs', async () => {
      const data: inputFindMultipleZones = { ids: [1, 2, 3] };
      const expectedResponse: arrayZones = {
        zones: [
          { id: 1, name: 'Zone 1', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
          { id: 2, name: 'Zone 2', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
          { id: 3, name: 'Zone 3', cantEstacionamientosTotales: 30, cantEstacionamientosOcupados: 0 },
        ],
      };

      jest.spyOn(zonesRepository, 'find').mockResolvedValue(expectedResponse.zones);

      const result = await service.findMultiple(data.ids);

      expect(result).toEqual(expectedResponse);
      expect(zonesRepository.find).toHaveBeenCalledTimes(1);
      expect(zonesRepository.find).toHaveBeenCalledWith({ where: { id: In(data.ids) } });
    });
  });

  describe('reduceReservedSpots', () => {
    it('should reduce reserved spots for a zone', async () => {
      const data: any = { zoneid: 1 }; 
      const expectedResponse: any = { success: true }; 

      jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(mockZones.zones[0]);
      jest.spyOn(mockQueryRunner.manager, 'save').mockResolvedValue(mockZones.zones[0]);

      const result = await service.reduceReservedSpots(data);

      expect(result).toEqual(expectedResponse);
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalledTimes(3);
      expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(2);
    });

    it('should handle error when failed to reduce reserved spots for a zone', async () => {
      const data: any = { zoneid: 1 }; 
      const expectedResponse = {
        success: false,
        message: 'No parking spots to reduce', 
      };

      jest.spyOn(mockQueryRunner.manager, 'findOne').mockResolvedValue(null);

      const result = await service.reduceReservedSpots(data);

      expect(result).toEqual(expectedResponse);
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalledTimes(4);
    });
  });
});
