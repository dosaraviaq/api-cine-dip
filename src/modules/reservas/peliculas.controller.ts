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

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('imagenes', 5, configuracionMulter('pelicula', 5)),
  )
  @HandleException('Error al registrar la película')
  async crearPelicula(
    @Body() dataDto: CrearPeliculaDto,
    @UploadedFiles() archivos?: Express.Multer.File[],
  ): Promise<SuccessResponse<Pelicula>> {
    const pelicula = await this.reservasService.crearPelicula(
      dataDto,
      archivos,
    );

    return ResponseUtils.success(pelicula, 'Película registrada correctamente');
  }

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
