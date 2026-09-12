import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pelicula } from './pelicula.entity';

@Entity({
  schema: 'cartelera',
  name: 'imagen_pelicula',
})
export class ImagenPelicula {
  @PrimaryGeneratedColumn({
    name: 'id_imagen_pelicula',
  })
  id!: number;

  @Column({
    name: 'nombre_archivo',
    type: 'varchar',
    length: 255,
  })
  nombreArchivo!: string;

  @Column({
    name: 'tamano_bytes',
    type: 'bigint',
  })
  tamanoBytes!: number;

  @ManyToOne(
    () => Pelicula,
    (pelicula: Pelicula) => pelicula.imagenes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'id_pelicula',
  })
  pelicula!: Pelicula;
}