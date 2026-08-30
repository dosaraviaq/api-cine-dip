import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({schema: 'identidad', name:'persona'})
export class Persona {

    @PrimaryGeneratedColumn({name: 'id_persona'})
    id!:number;

    @Column({name: 'nombres'})
    nombres!: string;

    @Column({name: 'apellidos'})
    apellidos!: string;

    @Column({name: 'documento'})
    documento!: string;

    @Column({name: 'telefono'})
    telefono!: string;

    @Column({name: 'email'})
    email!: string;

    @Column({name: 'fecha_nacimiento'})
    fechaNacimiento!: Date;


}
