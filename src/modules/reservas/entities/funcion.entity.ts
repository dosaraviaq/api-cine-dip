// ctrl k + f
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Sala } from './sala.entity';
import { Pelicula } from './pelicula.entity';

@Entity({ schema: 'cartelera', name: 'funcion' })
export class Funcion {
    @PrimaryGeneratedColumn({name:'id_funcion'})
    id!: number;

    @Column({name:'id_pelicula'})
    idPelicula!: number;

    @Column({name:'id_sala'})
    idSala!: number;
    
    @Column({name:'fecha'})
    fecha!: Date;

    @Column({name:'hora_inicio'})
    horaInicio!: Date;

    @Column({name:'hora_fin'})
    horaFin!: Date;

    @Column({name:'precio'})
    precio!: number;

    @Column({name:'estado'})
    estado!: string;

    @OneToMany(
        ()=> Reserva,
        (reserva: Reserva)=> reserva.funcion
    )
    reserva!: Reserva[];

    @ManyToOne(
        ()=> Sala,
        (sala: Sala)=> sala.funcion
    )
    @JoinColumn({name:'id_sala'})
    sala!: Sala;

    @ManyToOne(
        ()=> Pelicula,
        (pelicula: Pelicula)=> pelicula.funcion
    )
    @JoinColumn({name:'id_pelicula'})
    pelicula!: Pelicula
}
