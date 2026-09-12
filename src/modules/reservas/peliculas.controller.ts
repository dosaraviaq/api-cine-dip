import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { Pelicula } from './entities/pelicula.entity';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { crearPeliculaDto } from './dto/crear-pelicula.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { configuracionMulter } from 'src/common/config/multer.config';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('imagenes', 5, configuracionMulter('pelicula', 5))
  )
  @HandleException('Error al crear peliculas')
  async crearPelicula(
    @Body() dataDto: crearPeliculaDto,
    @UploadedFiles() archivos?: Express.Multer.File[],
  ): Promise<SuccessResponse<Pelicula>> {
    const peliculas = await this.reservasService.crearPelicula(
      dataDto,
      archivos,
    );
    return ResponseUtils.success(
      peliculas,
      'Pelicula Registrada Correctamente',
    );
  }

  @Get()
  @HandleException('Error al cargar peliculas')
  async obtenerPeliculas(): Promise<SuccessResponse<Pelicula[]>> {
    const peliculas = await this.reservasService.obtenerPeliculas();
    return ResponseUtils.success(
      peliculas,
      'Lista de peliculas cargada correctamente',
    );
  }
}
