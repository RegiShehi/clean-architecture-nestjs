import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IEnvironmentConfig } from './domain/abstracts/config/environment-config.abstract';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import cookieParser from 'cookie-parser';
import { WinstonLoggerConfig } from './infrastructure/services/logger/logger.config';
import { LoggerService } from './infrastructure/services/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  app.setGlobalPrefix('api');
  app.use(cookieParser());

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

  const configService = app.get(IEnvironmentConfig);

  app.useLogger(WinstonLoggerConfig(configService.logger));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  await app.listen(configService.getServerPort());
}
bootstrap();
