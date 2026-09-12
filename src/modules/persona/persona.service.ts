import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PersonaRepository } from './persona.repository';
import { Persona } from './entities/persona.entity';
import {DataSource} from 'typeorm';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';
import { PaginationResult } from 'src/common/interfaces/PaginationResult.type';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PersonaService {
  constructor(
    private readonly personaRepositopry: PersonaRepository,
    private readonly dataSource: DataSource,
    private readonly authService: AuthService
  ){}


  async obtenerPersonas(dto: PaginacionParamsDto):Promise<PaginationResult<Persona>>{
    const personas = await this.personaRepositopry.obtenerPersona(dto);
    return personas;
  }

  async obtenerPersonaId(id: number):Promise<Persona>{
    const persona= await this.personaRepositopry.obtenerPersonaId(id);    
    if(!persona)
      throw new NotFoundException('No se encontro la persona con el id:'+ id)    
    return persona;
  }

  async crearPersona(dataDto: CreatePersonaDto):Promise<Partial<Persona>>{
    const {usuario, constrasena, ...personaData} = dataDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const persona = await this.personaRepositopry.crearPersona(personaData, queryRunner);
      // Crea mi usuario
      await this.authService.crearUsuario({
        idPersona: persona.id,
        usuario: usuario,
        contrasena: constrasena
      },
      3,
      queryRunner
    );

    await this.personaRepositopry.crearCliente({
      idPersona: persona.id,
      fechaRegistro: new Date(),
      activo: true
    }, queryRunner);
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

  // async modifcarPersona(id: number, dataDto: Partial<CreatePersonaDto>):Promise<Partial<Persona>>{
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const persona = await this.personaRepositopry.modificarPersona(id, dataDto, queryRunner);
  //     // throw new NotFoundException();
  //     await queryRunner.commitTransaction();
  //     return  {
  //       nombres: persona!.nombres,
  //       apellidos: persona!.apellidos,
  //       telefono: persona!.telefono
  //     };
      
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally{
  //      await queryRunner.release();
  //   }
  // }
}
