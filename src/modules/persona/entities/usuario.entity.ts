import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}