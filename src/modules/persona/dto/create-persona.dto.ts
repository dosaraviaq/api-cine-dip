import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreatePersonaDto {

@IsString({message: 'Los nombres Son obligatorios'})
nombres!: string;

@IsString({message: 'Los apellidos son requeridos'})
apellidos!: string;

@IsString({message: 'El documento es requerido'})
documento!: string;

@IsString({message: 'El telefono es requerido'})
telefono!: string;

@IsEmail()
email!: string;

@IsDateString()
fechaNacimiento!: Date;
}
