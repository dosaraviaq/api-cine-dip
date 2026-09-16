import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { RolUsuario } from './rol-usuario.entity';


@Entity({schema: 'seguridad',name:'rol'})
export class Rol{

    @PrimaryGeneratedColumn({name: 'id_rol'})
    id!: number;

    @Column({name: 'rol'})
    rol!: string;

    @OneToMany( 
        () =>RolUsuario, 
        // falta la columna
        (rolUsuario:RolUsuario) => rolUsuario.rol)
        rolUsuario!: RolUsuario[]
}