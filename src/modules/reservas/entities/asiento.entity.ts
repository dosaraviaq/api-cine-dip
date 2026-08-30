import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({schema: 'cartelera', name:'asiento'})
export class Asiento{
    @PrimaryGeneratedColumn({name: 'id_asiento'})
    idAsiento!: number;

    @Column({name: 'id_sala'})
    idSala!: number;

    @Column({name: 'fila'})
    fila!: string;

    @Column({name: 'numero'})
    numero!: number;

    @Column({name: 'tipo'})
    tipo!: string;

    @Column({name: 'activo'})
    activo!: boolean;

}