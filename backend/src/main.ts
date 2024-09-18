import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Cors käyttöön
  await app.listen(3001); // Pitää olla sama kuin frontissa!
  //frontend/src/api.ts
}
bootstrap();