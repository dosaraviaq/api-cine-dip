import { ApiProperty, PickType } from '@nestjs/swagger';
import { CrearPeliculaDto } from './crear-pelicula.dto';

export class ImagenPeliculaRespuestaDto {
  @ApiProperty({ example: 1 })
  id!: number;
  @ApiProperty({ example: 'pelicula-550e8400-e29b-41d4-a716-446655440000.jpg' })
  nombreArchivo!: string;
  @ApiProperty({ example: 204800 })
  tamanoBytes!: number;
}

export class PeliculaCreadaDto extends PickType(CrearPeliculaDto, [
  'titulo',
  'sinopsis',
  'activo',
] as const) {
  @ApiProperty({ example: 1 })
  id!: number;
  @ApiProperty({ example: 120 })
  duracion!: number;
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-09-15T00:00:00.000Z',
  })
  fecha!: string;
  @ApiProperty({ type: [ImagenPeliculaRespuestaDto] })
  imagenes!: ImagenPeliculaRespuestaDto[];
}

export class PeliculaListadoDto extends CrearPeliculaDto {
  @ApiProperty({ example: 1 })
  id!: number;
  @ApiProperty({
    type: [String],
    description:
      'Nombres de archivos para consultar en GET /api/v1/files/pelicula/{nombreArchivo}.',
    example: ['pelicula-550e8400-e29b-41d4-a716-446655440000.jpg'],
  })
  imagenes!: string[];
}
