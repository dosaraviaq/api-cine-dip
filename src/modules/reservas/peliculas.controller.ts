import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiBadRequestResponse,
  ApiPayloadTooLargeResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import {
  PeliculaCreadaDto,
  PeliculaListadoDto,
} from './dto/pelicula-respuesta.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CrearPeliculaDto } from './dto/crear-pelicula.dto';
import { Pelicula } from './entities/pelicula.entity';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';
import {
  PaginatedResponse,
  SuccessResponse,
} from 'src/common/interfaces/CustomResponse.interface';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { FilesInterceptor } from '@nestjs/platform-express';
import { configuracionMulter } from 'src/common/config/multer.config';
import { PeliculaListado } from './types/pelicula-listado.type';
import { RolEnum } from '../auth/enums/rol.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Películas')
@Auth(RolEnum.ADMIN, RolEnum.GERENTE)
@ApiExtraModels(CrearPeliculaDto)
@ApiTooManyRequestsResponse({ description: 'Límite de solicitudes excedido.' })
@ApiInternalServerErrorResponse({
  description: 'Error interno al procesar películas.',
})
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly reservasService: ReservasService) {}

  @ApiOperation({
    summary: 'Registrar película',
    description:
      'Admite JSON sin archivos o multipart/form-data con hasta 5 imágenes JPG, JPEG, PNG o WEBP de máximo 5 MiB cada una.',
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CrearPeliculaDto) },
        {
          type: 'object',
          properties: {
            imagenes: {
              type: 'array',
              maxItems: 5,
              description:
                'Archivos opcionales, solo para multipart/form-data.',
              items: { type: 'string', format: 'binary' },
            },
          },
        },
      ],
    },
  })
  @ApiSuccessResponse(
    PeliculaCreadaDto,
    'Película registrada correctamente',
    201,
  )
  @ApiBadRequestResponse({
    description:
      'Datos inválidos, formato de imagen no permitido o más de 5 archivos.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'Alguna imagen supera los 5 MiB.',
  })
  @Post()
  @UseInterceptors(
    FilesInterceptor('imagenes', 5, configuracionMulter('pelicula', 5)),
  )
  @HandleException('Error al registrar la película')
  async crearPelicula(
    @Body() dataDto: CrearPeliculaDto,
    @UploadedFiles() archivos?: Express.Multer.File[],
  ): Promise<SuccessResponse<Partial<Pelicula>>> {
    const pelicula = await this.reservasService.crearPelicula(
      dataDto,
      archivos,
    );

    return ResponseUtils.success(pelicula, 'Película registrada correctamente');
  }

  @ApiOperation({
    summary: 'Listar películas',
    description:
      'Devuelve películas paginadas con los nombres de sus imágenes.',
  })
  @ApiSuccessResponse(
    PeliculaListadoDto,
    'Lista de películas cargada correctamente',
    200,
    true,
  )
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  @ApiQuery({ type: PaginacionParamsDto })
  @Get()
  @HandleException('Error al cargar la lista de películas')
  async obtenerPeliculas(
    @Query() dto: PaginacionParamsDto,
  ): Promise<PaginatedResponse<PeliculaListado>> {
    const peliculas = await this.reservasService.obtenerPeliculas(dto);

    return ResponseUtils.paginated(
      peliculas.data,
      peliculas.total,
      dto.pagina,
      dto.porPagina,
      'Lista de películas cargada correctamente',
    );
  }
}
