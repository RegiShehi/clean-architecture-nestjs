import { Module } from '@nestjs/common';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { APP_FILTER } from '@nestjs/core';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { AuthUseCasesModule } from './use-cases/auth/auth-use-cases.module';
import { AuthController } from './controllers/auth.controller';
import { BcryptModule } from './infrastructure/services/auth/bcrypt/bcrypt.module';
import { JwtServiceModule } from './infrastructure/services/auth/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/services/configuration/common/environment-config.module';
import { DataServicesModule } from './infrastructure/services/database/data-services.module';
import { AllExceptionFilter } from './infrastructure/services/exceptions/exception.filter';
import { ExceptionsModule } from './infrastructure/services/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/services/logger/logger.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    ExceptionsModule,
    LoggerModule,
    BcryptModule,
    JwtServiceModule,
    AuthUseCasesModule,
    UserUseCasesModule,
    AuthorUseCasesModule,
    BookUseCasesModule,
  ],
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
