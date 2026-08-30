import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PersonaRepository } from './persona.repository';
import { Persona } from './entities/persona.entity';
import {DataSource} from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(
    private readonly personaRepositopry: PersonaRepository,
    private readonly dataSource: DataSource
  ){}


  async obtenerPersonas():Promise<Persona[]>{
    const personas = await this.personaRepositopry.obtenerPersona();
    return personas;
  }

  async obtenerPersonaId(id: number):Promise<Persona>{
    const persona= await this.personaRepositopry.obtenerPersonaId(id);    
    if(!persona)
      throw new NotFoundException('No se encontro la persona con el id:'+ id)    
    return persona;
  }

  async crearPersona(dataDto: CreatePersonaDto):Promise<Partial<Persona>>{
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const persona = await this.personaRepositopry.crearPersona(dataDto, queryRunner);
      // throw new NotFoundException();
      await queryRunner.commitTransaction();
      return  {
        nombres: persona.nombres,
        apellidos: persona.apellidos,
        telefono: persona.telefono
      };
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally{
       await queryRunner.release();
    }
  }

  async modifcarPersona(id: number, dataDto: CreatePersonaDto):Promise<Partial<Persona>>{
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const persona = await this.personaRepositopry.modificarPersona(id, dataDto, queryRunner);
      // throw new NotFoundException();
      await queryRunner.commitTransaction();
      return  {
        nombres: persona!.nombres,
        apellidos: persona!.apellidos,
        telefono: persona!.telefono
      };
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally{
       await queryRunner.release();
    }
  }
}
