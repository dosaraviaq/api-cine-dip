import { IsString, MaxLength, MinLength } from "class-validator";

export class loginUsuario{
    
    @IsString()
    usuario!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    contrasena!: string;
}