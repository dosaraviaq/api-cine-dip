import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandleException } from 'src/common/decorators/handleException.decorator';
import { loginUsuario } from './dto/login.dto';
import { SuccessResponse } from 'src/common/interfaces/CustomResponse.interface';
import { ResponseUtils } from 'src/common/utils/Response.utils';
import { UsuarioRespuesta } from './types/usuario-respuesta.type';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Autenticación de usuario', type:loginUsuario})
  @HandleException('Error en la autenticación')
  async loginUsuario(
    @Body() dataDto: loginUsuario
  ):Promise<SuccessResponse<{token:string}>>{
    const usuario = await this.authService.login(dataDto);
    return ResponseUtils.success(usuario, 'Usuario autenticado');
  }
}
