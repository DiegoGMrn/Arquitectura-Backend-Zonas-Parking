import { Observable } from "rxjs";
export interface Empty {
}
export interface Zones {
    id: number;
    name: string;
    cantEstacionamientosTotales: number;
    cantEstacionamientosOcupados: number;
}
export interface ZonesServiceClient {
    findAll(request: Empty): Observable<Zones>;
}