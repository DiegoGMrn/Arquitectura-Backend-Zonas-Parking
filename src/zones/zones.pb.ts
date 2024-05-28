import { Observable } from "rxjs";
export interface Empty {
}
export interface Zones {
    id: number;
    name: string;
    cantEstacionamientosTotales: number;
    cantEstacionamientosOcupados: number;
}
export interface inputCreateZone {
    name: string;
    cantEstacionamientosTotales: number;
    cantEstacionamientosOcupados: number;
}

export interface CreateZoneResponse {
    success: boolean;
  }
  
export interface ZonesServiceClient {
    findAll(request: Empty): Observable<Zones>;
    create(request: inputCreateZone): Observable<CreateZoneResponse>;
}
export interface inputDeleteZone {
    id: number;
}

