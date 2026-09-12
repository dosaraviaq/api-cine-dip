import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class crearPeliculaDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsNotEmpty()
  @IsString()
  sinopsis!: string;

  @Type(() => Number)
  @IsInt()
  duracionMinutos!: number;

  @IsNotEmpty()
  @IsDateString()
  fechaEstreno!: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === true || value === 'true') return true;
    if (value === false || value === 'false') return false;

    return value;
  })
  activo!: boolean;
}
