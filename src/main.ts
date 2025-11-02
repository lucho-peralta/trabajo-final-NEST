import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // elimina propiedades extra no definidas en el dto.
    forbidNonWhitelisted: true, // tira error si vienen propiedades extra.
    transform: true,        // convierte automáticamente tipos (string a number, etc.).
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
