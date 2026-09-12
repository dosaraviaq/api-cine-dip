import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolEnum } from "../enums/rol.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/roles.guard";

export function Auth(...roles: RolEnum[]){
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard('jwt'), RolesGuard)
    )
}