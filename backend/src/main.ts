import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkAndCreateDataFile } from './file-utils'; // Import the utility function

async function bootstrap() {
    // Tarkistaa onko json file
    checkAndCreateDataFile();

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Cors käyttöön
  await app.listen(3001); // Pitää olla sama kuin frontissa!
  //frontend/src/api.ts


}
bootstrap();