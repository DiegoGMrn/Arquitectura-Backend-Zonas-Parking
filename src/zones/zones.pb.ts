import { Observable } from "rxjs";
export interface Empty {
}
export interface Zones {
    id: number;
    name: string;
    cant_estacionamientos_totales: string;
    cant_estacionamientos_ocupados: number;
}
export interface ZonesServiceClient {
    findAll(): Observable<Zones>;
}