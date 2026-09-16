import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AsignarRolUsuarioDto {
  @ApiProperty({ description: 'ID de la persona con usuario existente.', example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  idPersona!: number;

  @ApiProperty({ description: 'ID del rol existente que se asignara.', example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  idRol!: number;
}
