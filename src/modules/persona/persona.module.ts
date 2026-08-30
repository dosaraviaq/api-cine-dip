import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { PersonaRepository } from './persona.repository';
import { Rol } from './entities/rol.entity';
import { RolUsuario } from './entities/rol-usuario.entity';
import { Usuario } from './entities/usuario.entity';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona, Rol, RolUsuario, Usuario, Cliente])
  ],
  controllers: [PersonaController],
  providers: [PersonaService, PersonaRepository],
})
export class PersonaModule {}
