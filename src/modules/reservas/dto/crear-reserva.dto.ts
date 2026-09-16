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
  detalles!: DetalleReservaDto[];
}