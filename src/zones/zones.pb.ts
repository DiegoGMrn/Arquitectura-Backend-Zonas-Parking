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
export interface ZonesServiceClient {
    findAll(request: Empty): Observable<Zones>;
}
export interface inputDeleteZone {
    id: number;
}