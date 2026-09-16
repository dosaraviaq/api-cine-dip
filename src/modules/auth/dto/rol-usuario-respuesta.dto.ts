import { ApiProperty } from '@nestjs/swagger';

export class RolUsuarioRespuestaDto {
  @ApiProperty({ example: 1 })
  idRolUsuario!: number;

  @ApiProperty({ description: 'ID de la persona asociada al usuario.', example: 1 })
  idUsuario!: number;

  @ApiProperty({ example: 3 })
  idRol!: number;

  @ApiProperty({ type: String, format: 'date-time' })
  fechaInicio!: Date;

  @ApiProperty({ type: String, format: 'date-time', nullable: true, required: false })
  fechaFin?: Date | null;

  @ApiProperty({ example: true })
  estado!: boolean;
}
