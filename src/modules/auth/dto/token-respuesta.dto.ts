import { ApiProperty } from '@nestjs/swagger';

export class TokenRespuestaDto {
  @ApiProperty({
    description: 'JWT para usar en Authorization: Bearer <token>.',
    example: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.firma',
  })
  token!: string;
}
