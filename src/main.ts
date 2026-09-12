import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,Logger } from '@nestjs/common';
import { METHODS } from 'http';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap')

  app.enableCors({
    origin: true,
    METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders:'Content-Type, Accept, Authorization'
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )


  const config = new DocumentBuilder()
  .setTitle('Diplomado')
  .setDescription('Framework Nestjs')
  .setVersion('0.0.1')
  .build();

  const documento= SwaggerModule.createDocument(app,config );
  SwaggerModule.setup('documentacion', app, documento);
  
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`La aplicación está corriendo en: ${await app.getUrl()}`);
}
bootstrap();
