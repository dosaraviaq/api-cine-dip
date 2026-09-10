import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Usuario } from './entities/usuario.entity';
import {QueryRunner}from 'typeorm';
import { Rol } from './entities/rol.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async crearUsuario(
        dataUsuario: Partial<Usuario>,
        idRol: number,
        queryRunner: QueryRunner
    ){
        const usuario = await this.authRepository.crearUsuario(
          {
            ...dataUsuario,
            contrasena: await bcrypt.hash(dataUsuario.contrasena!, 10),
          },
          queryRunner,
        );
        const rol = await this.obtenerRolId(idRol)
        await this.authRepository.crearRolUsuario({
            usuario: usuario,
            rol: rol,
            estado: true,
            fechaInicio: new Date()
        }, queryRunner)
        return usuario;
    }

    private async obtenerRolId(id: number):Promise<Rol>{
        const rol= await this.authRepository.obtenerRolId(id);
        if(!rol)
            throw new  BadRequestException('No se encontro el rol')
        return rol;
    }
}
