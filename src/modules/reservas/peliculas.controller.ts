import { Controller, Get } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { Pelicula } from './entities/pelicula.entity';
import { ResponseUtils } from 'src/common/utils/Response.utils';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly reservasService: ReservasService) {

  }

  @Get()
  @HandleException('Error al cargar peliculas')
  async obtenerPeliculas():Promise<SuccessResponse<Pelicula[]>>{
    const peliculas= await this.reservasService.obtenerPeliculas();
    return ResponseUtils.success(peliculas, 'Lista de peliculas cargada correctamente')
  }
}
