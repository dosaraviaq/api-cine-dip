import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, Matches, Max } from 'class-validator';

export enum EstadoFuncion {
  PROGRAMADA = 'PROGRAMADA',
  CANCELADA = 'CANCELADA',
  FINALIZADA = 'FINALIZADA',
}

export class CrearFuncionDto {
  @ApiProperty({ example: 1, description: 'ID obtenido de GET /api/v1/peliculas.', minimum: 1 })
  @IsInt() @IsPositive()
  idPelicula!: number;

  @ApiProperty({ example: 1, description: 'ID obtenido de GET /api/v1/cartelera/salas.', minimum: 1 })
  @IsInt() @IsPositive()
  idSala!: number;

  @ApiProperty({ example: '2026-10-20', format: 'date', description: 'Fecha local de la funcion: YYYY-MM-DD.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true })
  fecha!: string;

  @ApiProperty({ example: '19:00:00', description: 'Hora local HH:mm:ss, sin zona horaria.' })
  @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
  horaInicio!: string;

  @ApiProperty({ example: '21:00:00', description: 'HH:mm:ss. Debe ser posterior al inicio en el mismo dia.' })
  @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
  horaFin!: string;

  @ApiProperty({ example: 35, minimum: 0, exclusiveMinimum: true, maximum: 99999999.99, multipleOf: 0.01 })
  @IsNumber({ maxDecimalPlaces: 2 }) @IsPositive() @Max(99999999.99)
  precio!: number;

  @ApiPropertyOptional({ enum: EstadoFuncion, default: EstadoFuncion.PROGRAMADA })
  @IsOptional() @IsEnum(EstadoFuncion)
  estado: EstadoFuncion = EstadoFuncion.PROGRAMADA;
}

export class FuncionCreadaDto extends CrearFuncionDto {
  @ApiProperty({ example: 1, description: 'ID generado; usar para consultar asientos y reservar.' })
  idFuncion!: number;
}
