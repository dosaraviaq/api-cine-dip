import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from './crear-reserva.dto';

export class ReservaRespuestaDto {
  @ApiProperty({ example: 1 })
  id!: number;
  @ApiProperty({ example: 1 })
  idCliente!: number;
  @ApiProperty({ example: 1 })
  idFuncion!: number;
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-09-15T20:00:00.000Z',
  })
  fechaReserva!: string;
  @ApiProperty({ example: 'RES-001-2026' })
  codigo!: string;
  @ApiProperty({
    enum: EstadoReserva,
    enumName: 'EstadoReserva',
    example: EstadoReserva.PENDIENTE,
  })
  estado!: EstadoReserva;
  @ApiProperty({ example: 70 })
  total!: number;
}

export class DetalleReservaRespuestaDto {
  @ApiProperty({ example: 1 })
  id!: number;
  @ApiProperty({ example: 1 })
  idReserva!: number;
  @ApiProperty({ example: 1 })
  idAsiento!: number;
  @ApiProperty({ example: 35 })
  precio!: number;
}

export class ResultadoReservaDto {
  @ApiProperty({ type: ReservaRespuestaDto })
  reserva!: ReservaRespuestaDto;
  @ApiProperty({ type: [DetalleReservaRespuestaDto] })
  detalles!: DetalleReservaRespuestaDto[];
}
