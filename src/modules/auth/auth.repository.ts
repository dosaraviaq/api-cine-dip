import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rol } from "./entities/rol.entity";
import {QueryRunner, Repository} from 'typeorm';
import { RolUsuario } from "./entities/rol-usuario.entity";
import { Usuario } from "./entities/usuario.entity";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
        @InjectRepository(RolUsuario)
        private readonly rolUsuarioRepository: Repository<RolUsuario>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ){}

    async crearRol(data: Partial<Rol>, querryRunner: QueryRunner):Promise<Rol>{
        const manager= querryRunner.manager;
        const rol = manager.create(Rol,data);
        return await manager.save(rol);
    }

    async crearRolUsuario(data: Partial<RolUsuario>, querryRunner: QueryRunner):Promise<RolUsuario>{
        const manager= querryRunner.manager;
        const rolUsuario = manager.create(RolUsuario,data);
        return await manager.save(rolUsuario);
    }

    async crearUsuario(data: Partial<Usuario>, querryRunner: QueryRunner):Promise<Usuario>{
        const manager= querryRunner.manager;
        const usuario = manager.create(Usuario,data);
        return await manager.save(usuario);
    }

    async obtenerRolId(id: number): Promise<Rol | null>{
        return await this.rolRepository.findOneBy({idRol: id});
    }

    async obtenerRolUsuarioId(id: number): Promise<RolUsuario | null>{
        return await this.rolUsuarioRepository.findOneBy({idRolUsuario: id});
    }

    async obtenerUsuarioId(id: number): Promise<Usuario | null>{
        return await this.usuarioRepository.findOneBy({idPersona: id});
    }
}
