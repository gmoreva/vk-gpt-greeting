import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { WebServerSetup } from '@infrastructure/webserver/web.server.setup';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(WebServerSetup).setup(app);
}

bootstrap();
