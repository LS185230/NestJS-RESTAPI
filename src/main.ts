import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Applied Validation Pipe
      whitelist: true, // This will strip extra fields send in request body not present in our dto's.
    }),
  );
  await app.listen(3000);
}
bootstrap();
