import { Body, Controller, Post } from '@nestjs/common';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

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
