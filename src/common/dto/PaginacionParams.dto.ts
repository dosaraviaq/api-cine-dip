import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginacionParamsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Cantidad de registros por página, mayor que cero.',
    default: 10,
    example: 10,
    minimum: 0,
    exclusiveMinimum: true,
  })
  porPagina: number = 10;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Página solicitada, mayor que cero.',
    default: 1,
    example: 1,
    minimum: 0,
    exclusiveMinimum: true,
  })
  pagina: number = 1;
}
