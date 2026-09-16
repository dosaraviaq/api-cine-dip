import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString({ message: 'Los nombres Son obligatorios' })
  @ApiProperty({ description: 'Nombres de la persona.', example: 'Ana María' })
  nombres!: string;

  @IsString({ message: 'Los apellidos son requeridos' })
  @ApiProperty({
    description: 'Apellidos de la persona.',
    example: 'Pérez López',
  })
  apellidos!: string;

  @IsString({ message: 'El documento es requerido' })
  @ApiProperty({ description: 'Documento de identidad.', example: '12345678' })
  documento!: string;

  @IsString({ message: 'El telefono es requerido' })
  @ApiProperty({ description: 'Número de teléfono.', example: '70123456' })
  telefono!: string;

  @IsEmail()
  @ApiProperty({ format: 'email', example: 'ana@example.com' })
  email!: string;

  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Fecha de nacimiento en formato ISO 8601.',
    example: '1995-05-20',
  })
  fechaNacimiento!: Date;

  @IsString()
  @ApiProperty({
    description: 'Nombre de usuario para iniciar sesión.',
    example: 'ana.perez',
  })
  usuario!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description:
      'Contraseña del usuario. El nombre actual del campo es constrasena.',
    format: 'password',
    writeOnly: true,
    minLength: 6,
    maxLength: 50,
    example: 'ClaveSegura123',
  })
  constrasena!: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description:
      'Identificador de un rol existente en la base de datos. En POST /persona/gerente se fuerza a 2, aunque se envie otro valor.',
    default: 3,
    example: 3,
  })
  rol: number=3;
}
