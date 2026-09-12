import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import {diskStorage} from 'multer';
import { extname, join } from "path";
import {randomUUID} from 'crypto';
import { BadRequestException } from "@nestjs/common";

export function configuracionMulter(
    prefijo: string,
    cantidadArchivos= 5,
): MulterOptions {
    return{
        storage: diskStorage({
            destination: join(process.cwd(), 'estatico', 'imagenes'),

            filename: (_request, archivo, callback)=>{
                const extension= extname(archivo.originalname).toLowerCase();
                const nuevoNombre= `${prefijo}-${randomUUID()}${extension}`
                callback(null, nuevoNombre);
            }
        }),

        fileFilter(_request, archivo, callback) {
            const tiposExtensiones =[
                'image/jpg',
                'image/jpeg',
                'image/png',
                'image/webp',
                'application/octet-stream',
            ];

            const tiposPermitidos =['.jpg', '.jpeg', '.png','.webp'];
            const extension= extname(archivo.originalname).toLowerCase();
            const tipoValido = tiposPermitidos.includes(archivo.mimetype);
            const extencionValida= tiposPermitidos.includes(extension);

            if(!tipoValido || !extencionValida)
                return callback(
            new BadRequestException(`Archivo no permitido: ${archivo.mimetype}`),
            false
        );
        callback(null, true)
        },
         limits:{
            fileSize: 5*1024*1024,
            files: cantidadArchivos,
         }
    }
}