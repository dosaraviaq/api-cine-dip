import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";
import { FindOptionsWhere, ILike, QueryRunner, Repository } from 'typeorm'
import { BuscarPersonaDto } from './dto/buscar-persona.dto';
import { PaginacionParamsDto } from "src/common/dto/PaginacionParams.dto";
import { PaginationResult } from "src/common/interfaces/PaginationResult.type";
import { Cliente } from "./entities/cliente.entity";

@Injectable()
export class PersonaRepository{
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona> 
    ){}

    async obtenerPersona(dto: PaginacionParamsDto):Promise<PaginationResult<Persona>> {
       const [personas, total]= await this.personaRepository.findAndCount({
        skip: (dto.pagina -1) *dto.porPagina,
        take: dto.porPagina,
        order:{
            id: 'ASC'
        }
       });
       return {data:personas,  total}
    }

    async buscarPersonas(dto: BuscarPersonaDto): Promise<PaginationResult<Persona>> {
        const where: FindOptionsWhere<Persona> = {};
        const patron = (valor: string) => `%${valor.replace(/[\\%_]/g, '\\$&')}%`;
        if (dto.nombres) where.nombres = ILike(patron(dto.nombres));
        if (dto.apellidos) where.apellidos = ILike(patron(dto.apellidos));
        const [data, total] = await this.personaRepository.findAndCount({
            where,
            skip: (dto.pagina - 1) * dto.porPagina,
            take: dto.porPagina,
            order: { id: 'ASC' },
        });
        return { data, total };
    }

    async obtenerPersonaId(id: number):Promise<Persona | null>
    {
        return await this.personaRepository.findOne({ where: {id: id}});
    }

    async crearPersona(
        data: Partial<Persona>,
        queryRunner: QueryRunner
    ):Promise<Persona>{
        const manager=  queryRunner.manager;
        const persona = manager.create(Persona, data);
        return await manager.save(persona);
    }

    async modificarPersona(
        id: number,
        data: Partial<Persona>,
        queryRunner: QueryRunner
    ):Promise<Partial<Persona | null | undefined>>{
        const manager=  queryRunner.manager;
        const persona= await manager.preload(Persona,{
            id,
            ...data
        });
    return await manager.save(persona);
    }

     async crearCliente(
        data: Partial<Cliente>,
        queryRunner: QueryRunner
    ):Promise<Cliente>{
        const manager=  queryRunner.manager;
        const persona = manager.create(Cliente, data);
        return await manager.save(persona);
    }
}
