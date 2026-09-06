import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Asiento } from './asiento.entity';
import { Funcion } from './funcion.entity';

@Entity({name:'sala', schema:'cartelera' })
export class Sala{

    @PrimaryGeneratedColumn({name:'id_sala'})
    id!: number;

    @Column({name:'nombre'})
    nombre!: string;

    @Column({name:'capacidad'})
    capacidad!: number;

    @Column({name:'tipo'})
    tipo!: string;

    @Column({name:'activa'})
    activa!: boolean;

    @OneToMany(
        ()=> Asiento,
        (asiento: Asiento )=> asiento.sala
    )
    asiento!: Asiento[];

     @OneToMany(
        ()=>Funcion,
        (funcion: Funcion)=> funcion.sala
     )
     funcion!:Funcion[];
}