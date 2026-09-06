import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginacionParamsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(()=> Number)
  porPagina: number = 10;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(()=> Number)
  pagina: number=1;
}