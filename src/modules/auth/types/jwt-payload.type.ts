export interface JwtPayload{
    id: number;
    usuario: string;
    roles: string[];
    iat?: number;
    exp?: number;
}