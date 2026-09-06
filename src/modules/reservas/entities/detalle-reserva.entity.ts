import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Reserva } from './reserva.entity';
import { Asiento } from './asiento.entity';

@Entity({schema:'ventas', name:'detalle_reserva'})
export class DetalleReserva{
    @PrimaryGeneratedColumn({name:'id_detalle_persona'})
    id!: number;

    @Column({name:'id_reserva'})
    idReserva!: number;

    @Column({name:'id_asiento'})
    idAsiento!: number;

    @Column({name:'precio'})
    precio!: number;

    @ManyToOne(
        ()=>Reserva,
        (reserva: Reserva) => reserva.detalleReserva
    )
    @JoinColumn({name:'id_reserva'})
    reserva!: Reserva;

    @ManyToOne(
        ()=> Asiento,
        (asiento: Asiento)=> asiento.detalleReserva
    )
    @JoinColumn({name:'id_asiento'})
    asiento!: Asiento;
}