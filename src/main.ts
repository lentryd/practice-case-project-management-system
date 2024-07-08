import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.CLIENT_DIR) app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
start();
