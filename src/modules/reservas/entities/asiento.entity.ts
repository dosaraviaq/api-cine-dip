import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { DetalleReserva } from './detalle-reserva.entity';
import { Sala } from './sala.entity';

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

    @OneToMany(
        ()=>DetalleReserva,
        (detalle: DetalleReserva)=> detalle.asiento
    )
    detalleReserva!: DetalleReserva[];

    @ManyToOne(
        ()=> Sala,
        (sala: Sala)=> sala.asiento
    )
    @JoinColumn({name:'id_sala'})
    sala!: Sala;
}