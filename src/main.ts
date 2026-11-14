import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const cors = process.env.CORS_ORIGIN == '*' ? true : (
    process.env.CORS_ORIGIN?.split(',').map(dominio => dominio.trim())
  );
  app.enableCors({
    origin: cors,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('API Cine')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

// Este código corresponde al modificado en el PROYECTO FINAL
/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  //const app = await NestFactory.createRepl(AppModule);
  //const logger = new Logger('Bootstrap');

  const cors = process.env.CORS_ORIGIN == '*' ? true : (
    process.env.CORS_ORIGIN?.split(',').map(dominio => dominio.trim())
  );
  app.enableCors({
    origin: cors,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  // Fuerza a que tome el puerto 3000 internamente y escuche hacia afuera
  const port = process.env.PORT || 3000;

  // dentro de bootstrap(), antes de app.listen(...)
  const config = new DocumentBuilder()
    .setTitle('API Cine')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);
  
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();*/


/*async function bootstrap() {
  // 1. REEMPLAZA LA LÍNEA DE CREATEREPL POR ESTA:
  const app = await NestFactory.create(AppModule);

  // 2. Asegúrate de tener el app.listen configurado en el puerto 3000 e IP 0.0.0.0
  //await app.listen(3000, '0.0.0.0');
  //console.log(`Application is running on: http://localhost:3000`);
  // Agrégale el parámetro '0.0.0.0' exactamente así:
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);


}
bootstrap();*/


/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Diplomado')
    .setDescription('Framework Nestjs')
    .setVersion('0.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Obtén el token en POST /api/v1/auth/login y pégalo aquí.',
    })
    .build();

  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, documento);

  await app.listen(3000, '0.0.0.0'); 
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
*/