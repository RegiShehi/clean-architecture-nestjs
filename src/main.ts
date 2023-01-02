import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonLoggerConfig } from './infrastructure/logger/winston-logger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IAWSConfig } from './domain/abstracts/config/aws-config.abstract';
import { IDataBaseConfig } from './domain/abstracts/config/database-config.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  app.setGlobalPrefix('api');

  if (env !== 'production') {
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
  }

  const loggerService = app.get(IAWSConfig);
  const dbService = app.get(IDataBaseConfig);

  app.useLogger(WinstonLoggerConfig(loggerService));

  await app.listen(dbService.getServerPort());
}
bootstrap();
