import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import { ResultadoReservaDto } from './dto/reserva-respuesta.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { ReservasService } from './reservas.service';

@ApiTags('Reservas')
@ApiTooManyRequestsResponse({ description: 'Límite de solicitudes excedido.' })
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @ApiOperation({
    summary: 'Registrar reserva',
    description:
      'Registra la reserva y los detalles de sus asientos en una transacción.',
  })
  @ApiBody({ type: CrearReservaDto })
  @ApiSuccessResponse(
    ResultadoReservaDto,
    'Reserva registrada correctamente',
    201,
  )
  @ApiBadRequestResponse({
    description: 'Datos inválidos, detalles vacíos o asientos repetidos.',
  })
  @ApiInternalServerErrorResponse({
    description: 'No se pudo registrar la reserva.',
  })
  @Post()
  @HandleException('Error al registrar la reserva')
  async crearReserva(@Body() dataDto: CrearReservaDto): Promise<
    SuccessResponse<{
      reserva: Reserva;
      detalles: DetalleReserva[];
    }>
  > {
    const resultado = await this.reservasService.crearReserva(dataDto);
    return ResponseUtils.success(resultado, 'Reserva registrada correctamente');
  }
}
