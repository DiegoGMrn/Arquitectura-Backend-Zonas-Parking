import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Zones {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    cantEstacionamientosTotales: number;
    @Column({default: 0})
    cantEstacionamientosOcupados: number;
}
