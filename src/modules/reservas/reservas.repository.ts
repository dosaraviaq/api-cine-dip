import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { QueryRunner, Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { Sala } from './entities/sala.entity';
import { ImagenPelicula } from './entities/imagen-pelicula.entity';
import { Funcion } from './entities/funcion.entity';
import { Asiento } from './entities/asiento.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';

@Injectable()
export class ReservasRepository {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
  ) {}

  async crearPelicula(
    data: Partial<Pelicula>,
    queryRunner: QueryRunner,
  ): Promise<Pelicula> {
    const manager = queryRunner.manager;
    const pelicula = manager.create(Pelicula, data);
    return await manager.save(pelicula);
  }

  async obtenerPeliculas():Promise<Pelicula[]>{
    return await this.peliculaRepository.find();
  }

  async crearImagenesPelicula(
    data: Partial<ImagenPelicula>,
    queryRunner: QueryRunner,
  ): Promise<ImagenPelicula> {
    const manager = queryRunner.manager;
    const imagen = manager.create(ImagenPelicula, data);
    return await manager.save(imagen);
  }

  async crearFuncion(
    data: Partial<Funcion>,
    queryRunner: QueryRunner,
  ): Promise<Funcion> {
    const manager = queryRunner.manager;
    const funcion = manager.create(Funcion, data);
    return await manager.save(funcion);
  }

  async crearSala(
    data: Partial<Sala>,
    queryRunner: QueryRunner,
  ): Promise<Sala> {
    const manager = queryRunner.manager;
    const sala = manager.create(Sala, data);
    return await manager.save(sala);
  }

  async crearAsiento(
    data: Partial<Asiento>,
    queryRunner: QueryRunner,
  ): Promise<Asiento> {
    const manager = queryRunner.manager;
    const asiento = manager.create(Asiento, data);
    return await manager.save(asiento);
  }

  async crearDetalleReserva(
    data: Partial<DetalleReserva>,
    queryRunner: QueryRunner,
  ): Promise<DetalleReserva> {
    const manager = queryRunner.manager;
    const detalle = manager.create(DetalleReserva, data);
    return await manager.save(detalle);
  }

  async crearReserva(
    data: Partial<Reserva>,
    queryRunner: QueryRunner,
  ): Promise<Reserva> {
    const manager = queryRunner.manager;
    const reserva = manager.create(Reserva, data);
    return await manager.save(reserva);
  }


}
