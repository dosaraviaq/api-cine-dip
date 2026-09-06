import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RolUsuario } from './rol-usuario.entity';
import { Persona } from './persona.entity';

@Entity({ schema:'seguridad', name: 'usuario'})
export class Usuario{
    @PrimaryGeneratedColumn({name: 'id_persona'})
    idPersona!: number;

    @Column({name: 'usuario'})
    usuario!: string;

    @Column({name: 'contrasena'})
    contrasena!: string;

    @Column({name: 'fecha_creacion'})
    fechaCreacion!: Date;

    @OneToMany(
        ()=> RolUsuario, 
        (rolUsuario: RolUsuario)=> rolUsuario.usuario
    )
    rolUsuario!: RolUsuario[];

    @OneToOne(
        ()=>Persona,
        (persona: Persona)=> persona.usuario
    )
    @JoinColumn({name:'id_persona'})
    persona!: Persona;
}