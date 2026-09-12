import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolEnum } from "../enums/rol.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
    private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean  {
        const rolePermitidos = this.reflector.getAllAndOverride<RolEnum[]>(
            'roles',
            [context.getHandler(), context.getClass()]
        );
        if (!rolePermitidos?.length)return true;

        const request = context.switchToHttp().getRequest();
        const usuario = request.user;

        return rolePermitidos.some((rol)=> usuario.roles.includes(rol))

    }
}