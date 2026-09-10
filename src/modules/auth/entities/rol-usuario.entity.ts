import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Rol } from './rol.entity';
import { Usuario } from './usuario.entity';


@Entity({schema:'seguridad', name:'rol_usuario'})
export class RolUsuario{

    @PrimaryGeneratedColumn({name: 'id_rol_usuario'})
    idRolUsuario!: number;

    @Column({name: 'id_usuario'})
    idUsuario!: number;

    @Column({name: 'id_rol'})
    idRol!: number;

    @Column({name: 'fecha_inicio'})
    fechaInicio!: Date;

    @Column({name: 'fecha_fin'})
    fechaFin!: Date;

    @Column({name: 'estado'})
    estado!: boolean;

    @ManyToOne(
        ()=> Rol,(rol: Rol)=> rol.rolUsuario)
    @JoinColumn({name: 'id_rol'})
    rol!: Rol;

    @ManyToOne(
        ()=> Usuario,
        (usuario: Usuario) => usuario.rolUsuario
    )
    @JoinColumn({name:'id_usuario'})
    usuario!: Usuario;

}