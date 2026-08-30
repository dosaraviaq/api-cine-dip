import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

 @Post()
   async crearPersona(@Body() dataDto: CreatePersonaDto ):Promise<Partial<Persona>>{
      return this.personaService.crearPersona(dataDto);
   }

   @Patch(':id')
   async modifcarPersona(@Param('id') id:number,@Body() dataDto: CreatePersonaDto){
    return this.personaService.modifcarPersona(id, dataDto);
   }

   @Get()
   async ObtnerPersonas():Promise<Persona[]>{
    return this.personaService.obtenerPersonas();
   }

   @Get(':id')
   async ObtenerPersonaId(@Param('id') id):Promise<Persona>{
    return this.personaService.obtenerPersonaId(id);
   }

  

}
