import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  obtenerImagenPelicula(nombreArchivo: string): string {
    const rutaArchivo = join(
      process.cwd(),
      'estatico',
      'imagenes',
      nombreArchivo,
    );

    if (!existsSync(rutaArchivo)) {
      throw new NotFoundException(
        'No se encontró la imagen solicitada',
      );
    }

    return rutaArchivo;
  }
}