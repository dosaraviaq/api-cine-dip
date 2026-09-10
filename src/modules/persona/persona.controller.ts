import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Query } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import type { Response } from 'express';
import { timestamp } from 'rxjs';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { PaginatedResponse, SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post() 
  @HandleException('Error al registrar a la persona')
  async crearPersona(@Body() dataDto: CreatePersonaDto ):Promise<SuccessResponse<Partial<Persona>>>{      
     const persona= await this.personaService.crearPersona(dataDto);      
     return ResponseUtils.success(persona, 'Persona Registrada correctamente')
   }
   
   // @Patch(':id')
   // async modifcarPersona(@Param('id') id:number,@Body() dataDto: CreatePersonaDto){
   //    return await this.personaService.modifcarPersona(id, dataDto);
   // }
   
   // TODO: EN ESTE PUNTO
   @Get()
   @HandleException('Error al cargar la lista de personas')   
   async ObtenerPersonas(@Query() dto: PaginacionParamsDto ):Promise<PaginatedResponse<Persona>>{
    const personas= await this.personaService.obtenerPersonas(dto);      
      return ResponseUtils.paginated(
         personas.data,
         personas.total,
         dto.pagina,
         dto.porPagina,
         'Lista de personas Cargadas Correctamente'
         );
   }

   @Get(':id')
   async ObtenerPersonaId(@Param('id') id):Promise<Persona>{
    return this.personaService.obtenerPersonaId(id);
   }

  

}
