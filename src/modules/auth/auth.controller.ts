import {
  ApiBody,
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import { TokenRespuestaDto } from './dto/token-respuesta.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { loginUsuario } from './dto/login.dto';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';

import { ApiTags } from '@nestjs/swagger';
import { Rol } from './entities/rol.entity';
import { Auth } from './decorators/auth.decorator';
import { RolEnum } from './enums/rol.enum';
import { AsignarRolUsuarioDto } from './dto/asignar-rol-usuario.dto';
import { RolUsuarioRespuestaDto } from './dto/rol-usuario-respuesta.dto';
import { RolUsuario } from './entities/rol-usuario.entity';

@ApiTags('Autenticación')
@ApiTooManyRequestsResponse({ description: 'Límite de solicitudes excedido.' })
@ApiInternalServerErrorResponse({
  description: 'Error interno al autenticar al usuario.',
})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Devuelve un JWT para los endpoints protegidos.',
  })
  @ApiBody({ type: loginUsuario })
  @ApiSuccessResponse(TokenRespuestaDto, 'Usuario autenticado', 201)
  @ApiBadRequestResponse({ description: 'Credenciales con formato inválido.' })
  @ApiUnauthorizedResponse({ description: 'Usuario o contraseña incorrectos.' })
  @HandleException('Error en la autenticación')
  async loginUsuario(
    @Body() dataDto: loginUsuario,
  ): Promise<SuccessResponse<{ token: string }>> {
    const usuario = await this.authService.login(dataDto);
    return ResponseUtils.success(usuario, 'Usuario autenticado');
  }

  @Get('roles')
  @Auth(RolEnum.ADMIN, RolEnum.GERENTE)
  async listarRoles(): Promise<SuccessResponse<Rol[]>>{
    const roles= await this.authService.listarRoles()
    return ResponseUtils.success(roles, 'Usuario autenticado');
  }

  @Post('rol-usuario')
  @Auth(RolEnum.ADMIN)
  @ApiOperation({
    summary: 'Asignar rol a un usuario',
    description: 'Asigna un rol a un usuario existente usando el ID de persona. Requiere rol ADMIN. El usuario debe iniciar sesion nuevamente para obtener un token con el nuevo rol.',
  })
  @ApiBody({ type: AsignarRolUsuarioDto })
  @ApiSuccessResponse(RolUsuarioRespuestaDto, 'Rol asignado correctamente', 201)
  @ApiBadRequestResponse({ description: 'IDs invalidos o rol inexistente.' })
  @ApiNotFoundResponse({ description: 'La persona indicada no tiene un usuario registrado.' })
  @HandleException('Error al asignar el rol al usuario')
  async asignarRolUsuario(
    @Body() dataDto: AsignarRolUsuarioDto,
  ): Promise<SuccessResponse<RolUsuario>> {
    const rolUsuario = await this.authService.asignarRolUsuario(dataDto);
    return ResponseUtils.success(rolUsuario, 'Rol asignado correctamente');
  }
}
