import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import {
  PersonaCreadaDto,
  PersonaRespuestaDto,
} from './dto/persona-respuesta.dto';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { Persona } from './entities/persona.entity';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import {
  PaginatedResponse,
  SuccessResponse,
} from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { RolEnum } from '../auth/enums/rol.enum';

@ApiTags('Personas')
@ApiTooManyRequestsResponse({ description: 'Límite de solicitudes excedido.' })
@ApiInternalServerErrorResponse({
  description: 'Error interno al procesar la persona.',
})
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @ApiOperation({
    summary: 'Registrar persona',
    description:
      'Crea la persona, su usuario y cliente. Requiere rol ADMIN o GERENTE.',
  })
  @ApiBody({ type: CreatePersonaDto })
  @ApiSuccessResponse(PersonaCreadaDto, 'Persona Registrada correctamente', 201)
  @ApiBadRequestResponse({
    description: 'Datos inválidos o rol de cliente no encontrado.',
  })
  @Post()
  // @Auth(RolEnum.CLIENTE)
  @HandleException('Error al registrar a la persona')
  async crearPersona(
    @Body() dataDto: CreatePersonaDto,
  ): Promise<SuccessResponse<Partial<Persona>>> {
    const persona = await this.personaService.crearPersona(dataDto);
    return ResponseUtils.success(persona, 'Persona Registrada correctamente');
  }

  // @Patch(':id')
  // async modifcarPersona(@Param('id') id:number,@Body() dataDto: CreatePersonaDto){
  //    return await this.personaService.modifcarPersona(id, dataDto);
  // }

  @ApiOperation({
    summary: 'Listar personas',
    description: 'Devuelve personas paginadas. Requiere rol ADMIN.',
  })
  @ApiSuccessResponse(
    PersonaRespuestaDto,
    'Lista de personas Cargadas Correctamente',
    200,
    true,
  )
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  @ApiQuery({ type: PaginacionParamsDto })
  @Get()
  @Auth(RolEnum.ADMIN, RolEnum.GERENTE)
  @HandleException('Error al cargar la lista de personas')
  async ObtenerPersonas(
    @Query() dto: PaginacionParamsDto,
  ): Promise<PaginatedResponse<Persona>> {
    const personas = await this.personaService.obtenerPersonas(dto);
    return ResponseUtils.paginated(
      personas.data,
      personas.total,
      dto.pagina,
      dto.porPagina,
      'Lista de personas Cargadas Correctamente',
    );
  }

  @ApiOperation({
    summary: 'Obtener persona por ID',
    description:
      'Devuelve directamente la persona. Requiere rol ADMIN o GERENTE.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador de la persona.',
  })
  @ApiOkResponse({
    description: 'Persona encontrada.',
    type: PersonaRespuestaDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontró la persona con el ID indicado.',
  })
  @Get(':id')
  async ObtenerPersonaId(@Param('id') id): Promise<Persona> {
    return this.personaService.obtenerPersonaId(id);
  }
}
