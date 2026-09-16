import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { PaginacionParamsDto } from 'src/common/dto/PaginacionParams.dto';

export class BuscarPersonaDto extends PaginacionParamsDto {
  @ApiPropertyOptional({ example: 'Ana', description: 'Coincidencia parcial en nombres, sin distinguir mayusculas.' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombres?: string;

  @ApiPropertyOptional({ example: 'Perez', description: 'Coincidencia parcial en apellidos, sin distinguir mayusculas.' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  apellidos?: string;

  @IsInt()
  @Min(1)
  pagina: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100, type: 'integer' })
  @IsInt()
  @Min(1)
  @Max(100)
  porPagina: number = 10;
}
