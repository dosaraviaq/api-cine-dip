import {
  ApiBody,
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/decorators/api-success-response.decorator';
import { TokenRespuestaDto } from './dto/token-respuesta.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { loginUsuario } from './dto/login.dto';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';

import { ApiTags } from '@nestjs/swagger';

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
}
