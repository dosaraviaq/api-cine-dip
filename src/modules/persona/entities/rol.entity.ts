import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({schema: 'seguridad',name:'rol'})
export class Rol{

    @PrimaryGeneratedColumn({name: 'id_rol'})
    idRol!: number;

    @Column({name: 'rol'})
    rol!: string;
}