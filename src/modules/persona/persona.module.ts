import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { PersonaRepository } from './persona.repository';
import { Cliente } from './entities/cliente.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona,  Cliente]),
    AuthModule
  ],
  controllers: [PersonaController],
  providers: [ PersonaService, PersonaRepository],
  exports:[TypeOrmModule, PersonaService, PersonaRepository]
})
export class PersonaModule {}
