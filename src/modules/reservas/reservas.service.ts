import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservasRepository } from './reservas.repository';
import { Pelicula } from './entities/pelicula.entity';
import { crearPeliculaDto } from './dto/crear-pelicula.dto';
import {DataSource} from 'typeorm';
import { ImagenPelicula } from './entities/imagen-pelicula.entity';

@Injectable()
export class ReservasService {
    constructor(
        private readonly repositoryReserva: ReservasRepository,
        private readonly dataSource: DataSource
    ){}

    async obtenerPeliculas():Promise<Pelicula[]>{
        const peliculas= await this.repositoryReserva.obtenerPeliculas();
        if(!peliculas)        
            throw new BadRequestException('No se encontraron peliculas')
        return peliculas;
    }

    async crearPelicula(
        dataDto: crearPeliculaDto,
        archivos: Express.Multer.File[]=[]
    ):Promise<Pelicula>{
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pelicula = await this.repositoryReserva.crearPelicula({
                titulo: dataDto.titulo,
                sinopsis: dataDto.sinopsis,
                duracion: dataDto.duracionMinutos,
                fecha: new Date(dataDto.fechaEstreno),
                activo: dataDto.activo
            },queryRunner);

            if(archivos.length>0){
                const datosImagenes: Partial<ImagenPelicula>[]= archivos.map(
                    (archivo)=>({
                        nombreArchivo: archivo.fieldname,
                        tamanoBytes: archivo.size,
                        pelicula
                    })
                );
                const imagenes = await this.repositoryReserva.crearImagenesPelicula(
                    datosImagenes, queryRunner
                );
                pelicula.imagenes =imagenes;
            }else{
                pelicula.imagenes=[];
            }
            await queryRunner.commitTransaction();
            return pelicula;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
