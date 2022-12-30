import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './services/configuration/environment-config.service';
import { WinstonLoggerConfig } from './infrastructure/logger/winston-logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLoggerConfig,
  });

  const configService = app.get(EnvironmentConfigService);

  await app.listen(configService.getServerPort());
}
bootstrap();
