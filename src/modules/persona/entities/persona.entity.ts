import {BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Cliente } from './cliente.entity';

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

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert(){
        this.nombres= this.nombres.toUpperCase();
        this.apellidos= this.apellidos.toUpperCase();
    }

    @OneToOne(
        ()=>Usuario,
        (usuario: Usuario)=> usuario.persona
    )
    usuario!: Usuario;

    @OneToOne(
        ()=> Cliente,
        (cliente: Cliente)=>cliente.persona
    )
    cliente!: Cliente;

}