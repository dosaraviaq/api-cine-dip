import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { RolUsuario } from '../../auth/entities/rol-usuario.entity';
import { Persona } from 'src/modules/persona/entities/persona.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ schema:'seguridad', name: 'usuario'})
export class Usuario{
    
    @PrimaryColumn({name: 'id_persona'})
    idPersona!: number;

    @ApiProperty({
        example: 'DENNIS12335'
    })
    @Column({name: 'usuario'})
    usuario!: string;

    @ApiProperty()
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
    @JoinColumn({name:'id_persona', referencedColumnName: 'id'})
    persona!: Persona;
}