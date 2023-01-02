import { Module } from '@nestjs/common';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { AuthorController } from './controllers/author.controller';
import { DataServicesModule } from './services/data/data-services.module';
import { BookController } from './controllers/book.controller';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './infrastructure/exceptions/exception.filter';
import { EnvironmentConfigModule } from './services/configuration/common/environment-config.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    ExceptionsModule,
    LoggerModule,
    UserUseCasesModule,
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
