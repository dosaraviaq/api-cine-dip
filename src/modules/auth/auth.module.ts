import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolUsuario } from './entities/rol-usuario.entity';
import { Usuario } from './entities/usuario.entity';
import { AuthRepository } from './auth.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Rol, RolUsuario, Usuario,])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports:[AuthService]
})
export class AuthModule {}
