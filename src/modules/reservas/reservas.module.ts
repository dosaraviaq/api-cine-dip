import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Asiento } from './entities/asiento.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reserva, Asiento])
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
