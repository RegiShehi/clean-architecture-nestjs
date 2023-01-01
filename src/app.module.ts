import { Module } from '@nestjs/common';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { AuthorController } from './controllers/author.controller';
import { DataServicesModule } from './services/data/data-services.module';
import { BookController } from './controllers/book.controller';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { EnvironmentConfigModule } from './services/configuration/environment-config.module';
import { WinstonLoggerModule } from './infrastructure/logger/winston-logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './infrastructure/exceptions/exception.filter';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    ExceptionsModule,
    WinstonLoggerModule,
    AuthorUseCasesModule,
    BookUseCasesModule,
  ],
  controllers: [AuthorController, BookController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
