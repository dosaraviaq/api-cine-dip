import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class loginUsuario {
  @ApiProperty({
    description: 'Nombre de usuario registrado.',
    example: 'ana.perez',
  })
  @IsString()
  usuario!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description: 'Contraseña del usuario.',
    format: 'password',
    writeOnly: true,
    minLength: 6,
    maxLength: 50,
    example: 'ClaveSegura123',
  })
  contrasena!: string;
}
