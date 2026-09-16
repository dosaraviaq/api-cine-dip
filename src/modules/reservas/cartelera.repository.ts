import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearFuncionDto, EstadoFuncion, FuncionCreadaDto } from './dto/crear-funcion.dto';
import { AsientoCarteleraDto, FuncionCarteleraDto, SalaCarteleraDto, ResumenSalaDto } from './dto/cartelera-respuesta.dto';
import { Sala } from './entities/sala.entity';
import { Pelicula } from './entities/pelicula.entity';
import { Funcion } from './entities/funcion.entity';
import { Asiento } from './entities/asiento.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';

@Injectable()
export class CarteleraRepository {
  constructor(private readonly dataSource: DataSource) {}

  async crearFuncion(dto: CrearFuncionDto): Promise<FuncionCreadaDto> {
    return this.dataSource.transaction(async (manager) => {
      const sala = await manager.findOne(Sala, {
        where: { id: dto.idSala }, lock: { mode: 'pessimistic_write' },
      });
      if (!sala) throw new NotFoundException('No se encontro la sala');
      if (!sala.activa) throw new BadRequestException('La sala esta inactiva');
      const pelicula = await manager.findOneBy(Pelicula, { id: dto.idPelicula });
      if (!pelicula) throw new NotFoundException('No se encontro la pelicula');
      if (!pelicula.activo) throw new BadRequestException('La pelicula esta inactiva');
      const estado = dto.estado ?? EstadoFuncion.PROGRAMADA;
      if (estado !== EstadoFuncion.CANCELADA) {
        const cruce = await manager.createQueryBuilder(Funcion, 'f')
          .where('f.idSala = :idSala', { idSala: dto.idSala })
          .andWhere('f.fecha = :fecha', { fecha: dto.fecha })
          .andWhere('f.estado <> :cancelada', { cancelada: EstadoFuncion.CANCELADA })
          .andWhere('f.horaInicio < :fin AND f.horaFin > :inicio', { fin: dto.horaFin, inicio: dto.horaInicio })
          .getExists();
        if (cruce) throw new ConflictException('La sala ya tiene una funcion en ese horario');
      }
      const funcion = await manager.save(Funcion, manager.create(Funcion, { ...dto, estado }));
      return {
        idFuncion: funcion.id, idPelicula: funcion.idPelicula, idSala: funcion.idSala,
        fecha: funcion.fecha, horaInicio: funcion.horaInicio, horaFin: funcion.horaFin,
        precio: Number(funcion.precio), estado,
      };
    });
  }

  listarSalas(): Promise<SalaCarteleraDto[]> {
    return this.dataSource.createQueryBuilder(Sala, 's')
      .select('s.id', 'idSala').addSelect('s.nombre', 'nombre')
      .addSelect('s.capacidad', 'capacidad').addSelect('s.tipo', 'tipo')
      .addSelect('s.activa', 'activa').orderBy('s.id', 'ASC').getRawMany();
  }

  resumenSalas(): Promise<ResumenSalaDto[]> {
    return this.dataSource.createQueryBuilder(Sala, 's').leftJoin('s.asiento', 'a')
      .select('s.id', 'idSala').addSelect('s.nombre', 'sala')
      .addSelect('s.capacidad', 'capacidad').addSelect('CAST(COUNT(a.idAsiento) AS integer)', 'asientosRegistrados')
      .groupBy('s.id').addGroupBy('s.nombre').addGroupBy('s.capacidad')
      .orderBy('s.id', 'ASC').getRawMany();
  }

  private consultaAsientos() {
    return this.dataSource.createQueryBuilder(Asiento, 'a').innerJoin('a.sala', 's')
      .select('a.idAsiento', 'idAsiento').addSelect('s.id', 'idSala')
      .addSelect('s.nombre', 'sala').addSelect('a.fila', 'fila').addSelect('a.numero', 'numero')
      .addSelect('CONCAT(a.fila, a.numero)', 'asiento').addSelect('a.tipo', 'tipo')
      .addSelect('a.activo', 'activo');
  }

  listarAsientos(idSala?: number): Promise<AsientoCarteleraDto[]> {
    const query = this.consultaAsientos();
    if (idSala !== undefined) query.where('s.id = :idSala', { idSala });
    return query.orderBy('s.id', 'ASC').addOrderBy('a.fila', 'ASC')
      .addOrderBy('a.numero', 'ASC').getRawMany();
  }

  listarFunciones(idPelicula?: number): Promise<FuncionCarteleraDto[]> {
    const query = this.dataSource.createQueryBuilder(Funcion, 'f')
      .innerJoin('f.pelicula', 'p').innerJoin('f.sala', 's')
      .select('f.id', 'idFuncion').addSelect('p.id', 'idPelicula').addSelect('p.titulo', 'pelicula')
      .addSelect('s.id', 'idSala').addSelect('s.nombre', 'sala').addSelect('s.tipo', 'tipoSala')
      .addSelect('CAST(f.fecha AS text)', 'fecha').addSelect('CAST(f.horaInicio AS text)', 'horaInicio')
      .addSelect('CAST(f.horaFin AS text)', 'horaFin').addSelect('CAST(f.precio AS double precision)', 'precio')
      .addSelect('f.estado', 'estado');
    if (idPelicula !== undefined) query.where('p.id = :idPelicula', { idPelicula });
    return query.orderBy('f.fecha', 'ASC').addOrderBy('f.horaInicio', 'ASC')
      .addOrderBy('f.id', 'ASC').getRawMany();
  }

  asientosFuncion(idFuncion: number): Promise<AsientoCarteleraDto[]> {
    const query = this.consultaAsientos().innerJoin('s.funcion', 'f');
    const ocupacion = query.subQuery().select('1').from(DetalleReserva, 'dr')
      .innerJoin('dr.reserva', 'r')
      .where('dr.idAsiento = a.idAsiento').andWhere('r.idFuncion = f.id')
      .andWhere('r.estado <> :cancelada').getQuery();
    return query.addSelect(
      '(a.activo AND s.activa AND UPPER(f.estado) <> :cancelada AND NOT EXISTS ' + ocupacion + ')',
      'disponible',
    ).where('f.id = :idFuncion', { idFuncion })
      .setParameter('cancelada', 'CANCELADA')
      .orderBy('a.fila', 'ASC').addOrderBy('a.numero', 'ASC').getRawMany();
  }
}
