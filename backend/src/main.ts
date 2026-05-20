import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EcoActionConfigService } from './eco-action-config/eco-action-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const ecoActionConfigService = app.get(EcoActionConfigService);
  await ecoActionConfigService.seedDefaults();

  await app.listen(3000);
}

bootstrap();