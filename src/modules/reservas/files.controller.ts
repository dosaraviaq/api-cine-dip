import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { FilesService } from './files.service';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Get('pelicula/:nombreArchivo')
  mostrarImagenPelicula(
    @Param('nombreArchivo') nombreArchivo: string,
    @Res() response: Response,
  ): void {
    const ruta =
      this.filesService.obtenerImagenPelicula(
        nombreArchivo,
      );

    response.sendFile(ruta);
  }
}