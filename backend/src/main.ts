import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EcoActionConfigService } from './eco-action-config/eco-action-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const ecoActionConfigService = app.get(EcoActionConfigService);
  await ecoActionConfigService.seedDefaults();

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
