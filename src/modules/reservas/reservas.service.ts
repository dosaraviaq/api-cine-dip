import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservasRepository } from './reservas.repository';
import { Pelicula } from './entities/pelicula.entity';

@Injectable()
export class ReservasService {
    constructor(
        private readonly repositoryReserva: ReservasRepository
    ){}

    async obtenerPeliculas():Promise<Pelicula[]>{
        const peliculas= await this.repositoryReserva.obtenerPeliculas();
        if(!peliculas)        
            throw new BadRequestException('No se encontraron peliculas')
        return peliculas;
    }
}
