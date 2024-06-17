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
}

export interface CreateZoneResponse {
    success: boolean;
  }
export interface inputFindOne {
    id: number;
}
  
export interface ZonesServiceClient {
    findAll(request: Empty): Observable<Zones>;
    create(request: inputCreateZone): Observable<boolean>;
    findOne(request: inputFindOne): Observable<Zones>;
}
export interface inputDeleteZone {
    id: number;
}
export interface UpdateAvailableSpotsRequest {
    zoneId: number;
}
export interface UpdateAvailableSpotsResponse {
    success: boolean;
}

