import {Column, Entity, PrimaryGeneratedColumn}from 'typeorm';

@Entity({schema:'ventas', name:'reserva'})
export class Reserva{

    @PrimaryGeneratedColumn({name: 'id_reserva'})
    id!: number;

    @Column({name: 'id_cliente'})
    idCliente!: number;

    @Column({name: 'id_funcion'})
    idFuncion!: number;

    @Column({name: 'fecha_reserva'})
    fechaReserva!: Date;

    @Column({name: 'codigo_reserva'})
    codigo!: string;

    @Column({name: 'estado'})
    estado!: string;

    @Column({name: 'total'})
    total!: number;
}