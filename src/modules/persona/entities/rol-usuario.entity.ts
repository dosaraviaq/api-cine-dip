import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({schema:'seguridad', name:'rol_usuario'})
export class RolUsuario{

    @PrimaryGeneratedColumn({name: 'id_rol_usuario'})
    idRolUsuario!: number;

    @Column({name: 'id_usuario'})
    idUsuario!: number;

    @Column({name: 'rol'})
    idRol!: number;

    @Column({name: 'fecha_incio'})
    fechaInicio!: Date;

    @Column({name: 'fecha_fin'})
    fechaFin!: Date;

    @Column({name: 'estado'})
    estado!: boolean;

}