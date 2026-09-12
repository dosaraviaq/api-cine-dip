import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class loginUsuario{
    
    @ApiProperty({
            example: 'DENNIS12335'
        })
    @IsString()
    usuario!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    contrasena!: string;
}