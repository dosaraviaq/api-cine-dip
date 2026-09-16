import { Injectable } from '@nestjs/common';
import { ReservasRepository } from './reservas.repository';
import { DataSource } from 'typeorm';
import { PersonaRepository } from '../persona/persona.repository';
import { Cliente } from '../persona/entities/cliente.entity';
import { Reserva } from './entities/reserva.entity';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { Pelicula } from './entities/pelicula.entity';
import { ImagenPelicula } from './entities/imagen-pelicula.entity';
import { ConfigService } from '@nestjs/config';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';
import { PaginationResult } from 'src/common/interfaces/PaginationResult.type';
import { PeliculaListado } from './types/pelicula-listado.type';
import { CrearPeliculaDto } from './dto/crear-pelicula.dto';

@Injectable()
export class ReservasService {
  constructor(
    private readonly reservaRepository: ReservasRepository,
    private readonly dataSource: DataSource,
    private readonly personaRepositopry: PersonaRepository,
    private readonly configService: ConfigService,
  ) {}

  async crearPelicula(
    dataDto: CrearPeliculaDto,
    archivos: Express.Multer.File[] = [],
  ): Promise<Pelicula> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pelicula = await this.reservaRepository.crearPelicula(
        {
          titulo: dataDto.titulo,
          sinopsis: dataDto.sinopsis,
          duracion: dataDto.duracionMinutos,
          fecha: new Date(dataDto.fechaEstreno),
          activo: dataDto.activo,
        },
        queryRunner,
      );

      if (archivos.length > 0) {
        const datosImagenes: Partial<ImagenPelicula>[] = archivos.map(
          (archivo) => ({
            nombreArchivo: archivo.filename,
            tamanoBytes: archivo.size,
            pelicula,
          }),
        );

        const imagenes = await this.reservaRepository.crearImagenesPelicula(
          datosImagenes,
          queryRunner,
        );

        pelicula.imagenes = imagenes;
      } else {
        pelicula.imagenes = [];
      }

      await queryRunner.commitTransaction();

      return pelicula;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async crearReserva(dataDto: CrearReservaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { detalles, ...datosReserva } = dataDto;
      const reserva = await this.reservaRepository.crearReserva(
        {
          idCliente: datosReserva.idCliente,
          idFuncion: datosReserva.idFuncion,
          fechaReserva: new Date(datosReserva.fechaReserva),
          codigo: datosReserva.codigoReserva,
          estado: datosReserva.estado,
          total: datosReserva.total,
        },
        queryRunner,
      );

      const detallesRegistrados: DetalleReserva[] = [];

      for (const detalle of detalles) {
        const detalleRegistrado =
          await this.reservaRepository.crearDetalleReserva(
            {
              idReserva: reserva.id,
              idAsiento: detalle.idAsiento,
              precio: detalle.precio,
            },
            queryRunner,
          );

        detallesRegistrados.push(detalleRegistrado);
      }

      await queryRunner.commitTransaction();

      return {
        reserva,
        detalles: detallesRegistrados,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async obtenerPeliculas(
  dto: PaginacionParamsDto,
): Promise<PaginationResult<PeliculaListado>> {
  const resultado =
    await this.reservaRepository.obtenerPeliculas(dto);

  return {
    data: resultado.data,
    total: resultado.total,
  };
}
}
