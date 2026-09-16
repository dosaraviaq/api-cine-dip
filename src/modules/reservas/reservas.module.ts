import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Asiento } from './entities/asiento.entity';
import { Pelicula } from './entities/pelicula.entity';
import { Funcion } from './entities/funcion.entity';
import { Sala } from './entities/sala.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { ImagenPelicula } from './entities/imagen-pelicula.entity';
import { ReservasRepository } from './reservas.repository';
import { PeliculasController } from './peliculas.controller';
import { PersonaModule } from '../persona/persona.module';
import { ConfigModule } from '@nestjs/config';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reserva,
      Asiento,
      Pelicula,
      Funcion,
      Sala,
      DetalleReserva,
      ImagenPelicula,
    ]),
    PersonaModule,
    ConfigModule
  ],
  controllers: [ReservasController, PeliculasController, FilesController],
  providers: [ReservasService, ReservasRepository, FilesService],
})
export class ReservasModule {}
