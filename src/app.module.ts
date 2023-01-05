import { Module } from '@nestjs/common';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { APP_FILTER } from '@nestjs/core';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AllExceptionFilter } from './infrastructure/services/exceptions/exception.filter';
import { ServicesModule } from './infrastructure/services/services.module';
import { UseCasesModule } from './use-cases/use-cases.module';

@Module({
  imports: [ServicesModule, UseCasesModule],
  controllers: [
    AuthorController,
    BookController,
    UserController,
    AuthController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
