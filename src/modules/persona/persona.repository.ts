import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";
import { QueryRunner, Repository } from 'typeorm'

@Injectable()
export class PersonaRepository{
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona> 
    ){}

    async obtenerPersona():Promise<Persona[]> {
        return await this.personaRepository.find(
            {
                order:{
                    id: 'ASC'
                }
            }
        );
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


}