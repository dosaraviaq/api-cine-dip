import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './persona.entity';
import { Reserva } from 'src/modules/reservas/entities/reserva.entity';

@Entity({schema: 'identidad', name:'cliente'})
export class Cliente{
    @PrimaryGeneratedColumn({name:'id_persona'})
    idPersona!: number;

    @Column({name: 'fecha_registro'})
    fechaRegistro!: Date;

    @Column({name: 'activo'})
    activo!: boolean;

    @OneToOne(
        ()=> Persona,
        (persona: Persona) =>persona.cliente
    )
    @JoinColumn({name:'id_persona'})
    persona!: Persona;

    @OneToMany(
        ()=> Reserva,
        (reserva: Reserva) => reserva.cliente
    )
    reserva!: Reserva[];
}