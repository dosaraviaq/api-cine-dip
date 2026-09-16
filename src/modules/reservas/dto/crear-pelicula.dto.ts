import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CrearPeliculaDto {
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toUpperCase()
      : value,
  )
  @IsNotEmpty({
    message: 'El título de la película es obligatorio',
  })
  @IsString({
    message: 'El título debe ser una cadena de texto',
  })
  titulo!: string;

  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toUpperCase()
      : value,
  )
  @IsNotEmpty({
    message: 'La sinopsis de la película es obligatoria',
  })
  @IsString({
    message: 'La sinopsis debe ser una cadena de texto',
  })
  sinopsis!: string;

  @Type(() => Number)
  @IsInt({
    message: 'La duración debe ser un número entero',
  })
  @Min(1, {
    message: 'La duración debe ser mayor que cero minutos',
  })
  duracionMinutos!: number;

  @IsNotEmpty({
    message: 'La fecha de estreno es obligatoria',
  })
  @IsDateString(
    {},
    {
      message:
        'La fecha de estreno debe tener un formato válido, por ejemplo: 2026-09-12',
    },
  )
  fechaEstreno!: string;

  @Transform(({ value }) => {
    if (value === true || value === 'true') return true;
    if (value === false || value === 'false') return false;

    return value;
  })
  @IsBoolean({
    message: 'El campo activo debe ser verdadero o falso',
  })
  activo!: boolean;
}