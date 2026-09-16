import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { QueryRunner, Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity';
import { Pelicula } from './entities/pelicula.entity';
import { Asiento } from './entities/asiento.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';
import { PaginationResult } from 'src/common/interfaces/PaginationResult.type';
import { Sala } from './entities/sala.entity';
import { ReservaListado } from './types/resultado-reservas.type';
import { ImagenPelicula } from './entities/imagen-pelicula.entity';
import { PeliculaListado } from './types/pelicula-listado.type';

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

  async crearImagenesPelicula(
    data: Partial<ImagenPelicula>[],
    queryRunner: QueryRunner,
  ): Promise<ImagenPelicula[]> {
    const imagenes = queryRunner.manager.create(ImagenPelicula, data);
    return queryRunner.manager.save(imagenes);
  }

  async obtenerPeliculas(
  dto: PaginacionParamsDto,
): Promise<PaginationResult<PeliculaListado>> {
  const { pagina = 1, porPagina = 10 } = dto;

  const query = this.peliculaRepository
    .createQueryBuilder('p')
    .leftJoin('p.imagenes', 'ip')
    .select([
      'p.id AS "id"',
      'p.titulo AS "titulo"',
      'p.sinopsis AS "sinopsis"',
      'p.duracion AS "duracionMinutos"',
      'p.fecha AS "fechaEstreno"',
      'p.activo AS "activo"',
    ])
    .addSelect(
      `
        COALESCE(
          JSON_AGG(
            ip.nombre_archivo
            ORDER BY ip.id_imagen_pelicula
          ) FILTER (
            WHERE ip.id_imagen_pelicula IS NOT NULL
          ),
          '[]'::JSON
        )
      `,
      'imagenes',
    )
    .groupBy('p.id')
    .orderBy('p.id', 'ASC')
    .offset((pagina - 1) * porPagina)
    .limit(porPagina);

  const [peliculas, total] = await Promise.all([
    query.getRawMany<PeliculaListado>(),
    this.peliculaRepository.count(),
  ]);

  return {
    data: peliculas,
    total,
  };
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
    data: Partial<Pelicula>,
    queryRunner: QueryRunner,
  ): Promise<Pelicula> {
    const manager = queryRunner.manager;
    const sala = manager.create(Pelicula, data);
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

  //   consultas con paginación

  async obtenerSalas(
    dto: PaginacionParamsDto,
  ): Promise<PaginationResult<Sala>> {
    const [peliculas, total] = await this.salaRepository.findAndCount({
      skip: (dto.pagina - 1) * dto.porPagina,
      take: dto.porPagina,
      order: {
        id: 'ASC',
      },
    });
    return { data: peliculas, total };
  }

  //todo!   Obtiene todas las reservas por ver
  async obtenerReservas(
    dto: PaginacionParamsDto,
  ): Promise<PaginationResult<ReservaListado>> {
    const { pagina = 1, porPagina = 10 } = dto;

    const query = this.reservaRepository
      .createQueryBuilder('r')
      .innerJoin('ventas.detalle_reserva', 'dr', 'dr.id_reserva = r.id_reserva')
      .innerJoin('cartelera.asiento', 'a', 'a.id_asiento = dr.id_asiento')
      .innerJoin('identidad.cliente', 'c', 'c.id_persona = r.id_cliente')
      .innerJoin('identidad.persona', 'p', 'p.id_persona = c.id_persona')
      .select([
        `CONCAT_WS(' ', p.nombres, p.apellidos) AS "cliente"`,
        `r.fecha_reserva AS "fechaReserva"`,
        `r.codigo_reserva AS "codigoReserva"`,
        `r.estado AS "estado"`,
        `
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'filaAsiento', a.fila,
            'numeroAsiento', a.numero
          )
          ORDER BY a.fila, a.numero
        ) AS "detalleAsiento"
      `,
      ])
      .groupBy('p.id_persona')
      .addGroupBy('r.id_reserva')
      .orderBy('r.fecha_reserva', 'DESC')
      .offset((pagina - 1) * porPagina)
      .limit(porPagina);

    const data = await query.getRawMany<ReservaListado>();

    const resultadoTotal = await this.reservaRepository
      .createQueryBuilder('r')
      .select('COUNT(DISTINCT r.id_reserva)', 'total')
      .getRawOne<{ total: string }>();

    return {
      data,
      total: Number(resultadoTotal?.total ?? 0),
    };
  }
}
