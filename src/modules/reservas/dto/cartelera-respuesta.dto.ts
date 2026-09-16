import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalaCarteleraDto {
  @ApiProperty() idSala!: number;
  @ApiProperty() nombre!: string;
  @ApiProperty() capacidad!: number;
  @ApiProperty() tipo!: string;
  @ApiProperty() activa!: boolean;
}

export class ResumenSalaDto {
  @ApiProperty() idSala!: number;
  @ApiProperty() sala!: string;
  @ApiProperty() capacidad!: number;
  @ApiProperty({
    description:
      'Cuenta todos los asientos registrados, incluidos los inactivos.',
  })
  asientosRegistrados!: number;
}

export class AsientoCarteleraDto {
  @ApiProperty() idAsiento!: number;
  @ApiProperty() idSala!: number;
  @ApiProperty() sala!: string;
  @ApiProperty({ example: 'A' }) fila!: string;
  @ApiProperty({ example: 1 }) numero!: number;
  @ApiProperty({ example: 'A1' }) asiento!: string;
  @ApiProperty() tipo!: string;
  @ApiProperty() activo!: boolean;
  @ApiPropertyOptional({
    description:
      'Solo en consulta por funcion. Comprueba asiento/sala activos, funcion no cancelada y ausencia de reserva no cancelada. Se valida nuevamente al reservar.',
  })
  disponible?: boolean;
}

export class FuncionCarteleraDto {
  @ApiProperty() idFuncion!: number;
  @ApiProperty() idPelicula!: number;
  @ApiProperty() pelicula!: string;
  @ApiProperty() idSala!: number;
  @ApiProperty() sala!: string;
  @ApiProperty() tipoSala!: string;
  @ApiProperty({ example: '2026-09-16' }) fecha!: string;
  @ApiProperty({ example: '19:00:00' }) horaInicio!: string;
  @ApiProperty({ example: '21:00:00' }) horaFin!: string;
  @ApiProperty({ example: 35 }) precio!: number;
  @ApiProperty() estado!: string;
}
