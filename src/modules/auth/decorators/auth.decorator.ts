import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolEnum } from '../enums/rol.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: RolEnum[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Token JWT ausente, inválido o vencido.',
    }),
    ApiForbiddenResponse({
      description: 'El usuario no tiene un rol permitido.',
    }),
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
  );
}
