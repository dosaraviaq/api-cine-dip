import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcion } from './funcion.entity';
import { ImagenPelicula } from './imagen-pelicula.entity';

@Entity({ schema: 'cartelera', name: 'pelicula' })
export class Pelicula {

    @PrimaryGeneratedColumn({name:'id_pelicula'})
    id!: number;

    @Column({name:'titulo'})
    titulo!: string;

    @Column({name:'sinopsis'})
    sinopsis!: string;

    @Column({name:'duracion_minutos'})
    duracion!: number;

    @Column({name:'fecha_estreno'})
    fecha!: Date;

    @Column({name:'activo'})
    activo!: boolean;

    @OneToMany(
        ()=> Funcion,
        (funcion: Funcion)=> funcion.pelicula
    )
    funcion!: Funcion[];

    @OneToMany(() => ImagenPelicula, (imagen: ImagenPelicula) => imagen.pelicula)
  imagenes!: ImagenPelicula[];
}
