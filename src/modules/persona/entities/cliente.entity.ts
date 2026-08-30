import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({schema: 'identidad', name:'cliente'})
export class Cliente{
    @PrimaryGeneratedColumn({name:'id_persona'})
    idPersona!: number;

    @Column({name: 'fecha_registro'})
    fechaRegistro!: Date;

    @Column({name: 'activo'})
    activo!: boolean;
}