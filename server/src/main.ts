import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  const API = process.env.CLIENT_URL;
  const CLIENT_URL = process.env.CLIENT_URL;

  const corsOptions: CorsOptions = {
    origin: [CLIENT_URL],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(compression());

  await app.listen(PORT, () => {
    logger.log(`🥝 Server started 🥝`);
    logger.log(`🍋 On port ${PORT} 🍋`);
    logger.log(`🍉 Link ${API}/graphql 🍉`);
  });
}
bootstrap();
