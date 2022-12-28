import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './services/configuration/environment-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvironmentConfigService);

  await app.listen(configService.getServerPort());
}
bootstrap();
