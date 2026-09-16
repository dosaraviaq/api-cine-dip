import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CrearFuncionDto } from './dto/crear-funcion.dto';
import { DataSource } from 'typeorm';
import { Funcion } from './entities/funcion.entity';
import { CarteleraRepository } from './cartelera.repository';

@Injectable()
export class CarteleraService {
  constructor(
    private readonly repository: CarteleraRepository,
    private readonly dataSource: DataSource,
  ) {}

  listarSalas() {
    return this.repository.listarSalas();
  }

  crearFuncion(dto: CrearFuncionDto) {
    if (dto.horaFin <= dto.horaInicio) {
      throw new BadRequestException('horaFin debe ser posterior a horaInicio en el mismo dia');
    }
    return this.repository.crearFuncion(dto);
  }
  resumenSalas() {
    return this.repository.resumenSalas();
  }
  listarAsientos(idSala?: number) {
    return this.repository.listarAsientos(idSala);
  }
  listarFunciones(idPelicula?: number) {
    return this.repository.listarFunciones(idPelicula);
  }

  async asientosFuncion(idFuncion: number) {
    if (
      !(await this.dataSource
        .getRepository(Funcion)
        .existsBy({ id: idFuncion }))
    ) {
      throw new NotFoundException('No se encontro la funcion');
    }
    return this.repository.asientosFuncion(idFuncion);
  }
}
