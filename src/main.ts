import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonLoggerConfig } from './infrastructure/logger/winston-logger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IEnvironmentConfig } from './domain/abstracts/database-config.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Clean architecture API')
    .setDescription('Clean architecture API description')
    .setVersion('1.0')
    .addTag('clean architecture')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  const configService = app.get(IEnvironmentConfig);

  app.useLogger(WinstonLoggerConfig(configService));

  await app.listen(configService.getServerPort());
}
bootstrap();
