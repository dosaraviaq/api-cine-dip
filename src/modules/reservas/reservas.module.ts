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

@Module({
  imports:[
    TypeOrmModule.forFeature([Reserva, Asiento, Pelicula, Funcion, Sala, DetalleReserva])
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
