import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Usuario } from './entities/usuario.entity';
import { QueryRunner } from 'typeorm';
import { Rol } from './entities/rol.entity';
import * as bcrypt from 'bcrypt';
import { loginUsuario } from './dto/login.dto';
import { UsuarioRespuesta } from './types/usuario-respuesta.type';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtServicio: JwtService,
  ) {}

  async crearUsuario(
    dataUsuario: Partial<Usuario>,
    idRol: number,
    queryRunner: QueryRunner,
  ) {
    const usuario = await this.authRepository.crearUsuario(
      {
        ...dataUsuario,
        contrasena: await bcrypt.hash(dataUsuario.contrasena!, 10),
      },
      queryRunner,
    );
    const rol = await this.obtenerRolId(idRol);
    await this.authRepository.crearRolUsuario(
      {
        usuario: usuario,
        rol: rol,
        estado: true,
        fechaInicio: new Date(),
      },
      queryRunner,
    );
    return usuario;
  }

  private async obtenerRolId(id: number): Promise<Rol> {
    const rol = await this.authRepository.obtenerRolId(id);
    if (!rol) throw new BadRequestException('No se encontro el rol');
    return rol;
  }

   async listarRoles(): Promise<Rol[]> {
    const rol = await this.authRepository.listarRoles();
    if (!rol) throw new BadRequestException('No se encontro el rol');
    return rol;
  }

  async login(dataDto: loginUsuario): Promise<{ token: string }> {
    const { usuario, contrasena } = dataDto;
    const user = await this.authRepository.login(usuario);
    if (!user)
      throw new UnauthorizedException('Credenciales no válidas (usuario)');
    const informacion = await this.authRepository.informacionUsuario(
      user.idPersona,
    );

    if (!bcrypt.compareSync(contrasena, user.contrasena))
      throw new UnauthorizedException('Credenciales no válidas (contraseña)');

    const payload: JwtPayload = {
      id: informacion.id,
      usuario: informacion.usuario,
      roles: informacion.roles,
    };
    return { token: this.generarJwt(payload) };
  }

  // jwt
  private generarJwt(payload: JwtPayload): string {
    return this.jwtServicio.sign(payload);
  }
}
