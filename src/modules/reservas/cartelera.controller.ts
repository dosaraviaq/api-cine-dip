import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { RolEnum } from '../auth/enums/rol.enum';
import { CarteleraService } from './cartelera.service';
import { CrearFuncionDto, FuncionCreadaDto } from './dto/crear-funcion.dto';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import {
  AsientoCarteleraDto,
  FuncionCarteleraDto,
  ResumenSalaDto,
  SalaCarteleraDto,
} from './dto/cartelera-respuesta.dto';
import {
  ConsultarAsientosDto,
  ConsultarFuncionesDto,
  FuncionParamsDto,
} from './dto/consulta-cartelera.dto';

@ApiTags('Cartelera')
@ApiBadRequestResponse({
  description: 'Los identificadores deben ser enteros positivos.',
})
@Controller('cartelera')
export class CarteleraController {
  constructor(private readonly service: CarteleraService) {}

  @Post('funciones')
  @Auth(RolEnum.ADMIN, RolEnum.GERENTE)
  @ApiOperation({
    summary: 'Registrar funcion',
    description: 'Seleccione idPelicula de GET /api/v1/peliculas e idSala de GET /api/v1/cartelera/salas. Envie fecha YYYY-MM-DD y horas HH:mm:ss del mismo dia. Omita estado para PROGRAMADA. Devuelve data.idFuncion para consultar /api/v1/cartelera/funciones/{idFuncion}/asientos y crear reservas.',
  })
  @ApiBody({ type: CrearFuncionDto })
  @ApiSuccessResponse(FuncionCreadaDto, 'Funcion registrada correctamente', 201)
  @ApiBadRequestResponse({ description: 'Datos invalidos, hora final no posterior al inicio, sala o pelicula inactiva.' })
  @ApiNotFoundResponse({ description: 'Sala o pelicula inexistente.' })
  @ApiConflictResponse({ description: 'Otra funcion no cancelada ocupa la misma sala, fecha y horario.' })
  @HandleException('Error al registrar la funcion')
  async crearFuncion(@Body() dto: CrearFuncionDto) {
    const funcion = await this.service.crearFuncion(dto);
    return ResponseUtils.success(funcion, 'Funcion registrada correctamente');
  }

  @Get('salas')
  @ApiOperation({ summary: 'Listar salas ordenadas por ID' })
  @ApiOkResponse({ type: [SalaCarteleraDto] })
  listarSalas() {
    return this.service.listarSalas();
  }

  @Get('salas/resumen')
  @ApiOperation({
    summary: 'Verificar capacidad y cantidad de asientos por sala',
  })
  @ApiOkResponse({ type: [ResumenSalaDto] })
  resumenSalas() {
    return this.service.resumenSalas();
  }

  @Get('asientos')
  @ApiOperation({
    summary: 'Listar asientos, opcionalmente filtrados por sala',
  })
  @ApiOkResponse({ type: [AsientoCarteleraDto] })
  listarAsientos(@Query() dto: ConsultarAsientosDto) {
    return this.service.listarAsientos(dto.idSala);
  }

  @Get('funciones')
  @ApiOperation({
    summary: 'Listar funciones con pelicula, sala, horario y precio',
  })
  @ApiOkResponse({ type: [FuncionCarteleraDto] })
  listarFunciones(@Query() dto: ConsultarFuncionesDto) {
    return this.service.listarFunciones(dto.idPelicula);
  }

  @Get('funciones/:idFuncion/asientos')
  @ApiOperation({
    summary: 'Consultar disponibilidad de asientos para una funcion',
    description:
      'Use idFuncion e idAsiento al registrar la reserva. Las reservas CANCELADA no ocupan asientos. La disponibilidad puede cambiar antes de confirmar.',
  })
  @ApiOkResponse({ type: [AsientoCarteleraDto] })
  @ApiNotFoundResponse({ description: 'Funcion inexistente.' })
  asientosFuncion(@Param() dto: FuncionParamsDto) {
    return this.service.asientosFuncion(dto.idFuncion);
  }
}
