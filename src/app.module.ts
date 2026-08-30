import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './modules/persona/persona.module';
import { ReservasModule } from './modules/reservas/reservas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts}'],
      autoLoadEntities: true,
      logging: true
    }),
    PersonaModule,
    ReservasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {  
}
