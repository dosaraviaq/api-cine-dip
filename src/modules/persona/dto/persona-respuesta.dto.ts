import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreatePersonaDto } from './create-persona.dto';

export class PersonaCreadaDto extends PickType(CreatePersonaDto, [
  'nombres',
  'apellidos',
  'telefono',
] as const) {}

export class PersonaRespuestaDto extends PickType(CreatePersonaDto, [
  'nombres',
  'apellidos',
  'documento',
  'telefono',
  'email',
  'fechaNacimiento',
] as const) {
  @ApiProperty({ example: 1 })
  id!: number;
}
