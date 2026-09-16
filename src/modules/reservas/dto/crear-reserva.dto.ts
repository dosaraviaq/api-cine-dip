import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Matches,
  ValidateNested,
} from 'class-validator';

export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
}

class DetalleReservaDto {
  @Type(() => Number)
  @IsNotEmpty({
    message: 'El identificador del asiento es obligatorio',
  })
  @IsInt({
    message: 'El identificador del asiento debe ser un número entero',
  })
  @IsPositive({
    message: 'El identificador del asiento debe ser mayor que cero',
  })
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
    description: 'Identificador del asiento.',
  })
  idAsiento!: number;

  @Type(() => Number)
  @IsNotEmpty({
    message: 'El precio del asiento es obligatorio',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'El precio debe ser un número con máximo dos decimales',
    },
  )
  @IsPositive({
    message: 'El precio del asiento debe ser mayor que cero',
  })
  @ApiProperty({
    minimum: 0,
    exclusiveMinimum: true,
    multipleOf: 0.01,
    example: 35,
    description: 'Precio positivo con máximo dos decimales.',
  })
  precio!: number;
}

export class CrearReservaDto {
  @Type(() => Number)
  @IsNotEmpty({
    message: 'El identificador del cliente es obligatorio',
  })
  @IsInt({
    message: 'El identificador del cliente debe ser un número entero',
  })
  @IsPositive({
    message: 'El identificador del cliente debe ser mayor que cero',
  })
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
    description: 'Identificador del cliente.',
  })
  idCliente!: number;

  @Type(() => Number)
  @IsNotEmpty({
    message: 'El identificador de la función es obligatorio',
  })
  @IsInt({
    message: 'El identificador de la función debe ser un número entero',
  })
  @IsPositive({
    message: 'El identificador de la función debe ser mayor que cero',
  })
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
    description: 'Identificador de la función.',
  })
  idFuncion!: number;

  @IsNotEmpty({
    message: 'La fecha de la reserva es obligatoria',
  })
  @IsDateString(
    {},
    {
      message:
        'La fecha de la reserva debe tener un formato válido, por ejemplo: 2026-09-12T10:30:00',
    },
  )
  @ApiProperty({
    description: 'Fecha de reserva en formato ISO 8601.',
    example: '2026-09-15T20:00:00.000Z',
  })
  fechaReserva!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsNotEmpty({
    message: 'El código de la reserva es obligatorio',
  })
  // @Matches(/^RES-\d{3}-\d{4}$/, {
  //   message: 'El código de la reserva debe tener el formato RES-001-2026',
  // })
  @ApiProperty({
    description:
      'Código de reserva; se recortan espacios y se convierte a mayúsculas.',
    example: 'RES-001-2026',
  })
  codigoReserva!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsNotEmpty({
    message: 'El estado de la reserva es obligatorio',
  })
  @IsEnum(EstadoReserva, {
    message:
      'El estado de la reserva debe ser PENDIENTE, CONFIRMADA o CANCELADA',
  })
  @ApiProperty({
    enum: EstadoReserva,
    enumName: 'EstadoReserva',
    example: EstadoReserva.PENDIENTE,
  })
  estado!: EstadoReserva;

  @Type(() => Number)
  @IsNotEmpty({
    message: 'El total de la reserva es obligatorio',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'El total debe ser un número con máximo dos decimales',
    },
  )
  @IsPositive({
    message: 'El total de la reserva debe ser mayor que cero',
  })
  @ApiProperty({
    minimum: 0,
    exclusiveMinimum: true,
    multipleOf: 0.01,
    example: 70,
    description: 'Total positivo con máximo dos decimales.',
  })
  total!: number;

  @IsArray({
    message: 'Los detalles de la reserva deben enviarse como un arreglo',
  })
  @ArrayMinSize(1, {
    message: 'La reserva debe contener al menos un asiento',
  })
  @ArrayUnique((detalle: DetalleReservaDto) => detalle.idAsiento, {
    message: 'No se puede seleccionar el mismo asiento más de una vez',
  })
  @ValidateNested({ each: true })
  @Type(() => DetalleReservaDto)
  @ApiProperty({
    type: () => [DetalleReservaDto],
    minItems: 1,
    description: 'Asientos reservados. No se permite repetir idAsiento.',
    example: [
      { idAsiento: 1, precio: 35 },
      { idAsiento: 2, precio: 35 },
    ],
  })
  detalles!: DetalleReservaDto[];
}
