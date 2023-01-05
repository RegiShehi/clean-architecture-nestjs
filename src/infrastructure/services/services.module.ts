import { Module } from '@nestjs/common';
import { BcryptModule } from './auth/bcrypt/bcrypt.module';
import { JwtServiceModule } from './auth/jwt/jwt.module';
import { EnvironmentConfigModule } from './configuration/common/environment-config.module';
import { DataServicesModule } from './database/data-services.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    ExceptionsModule,
    LoggerModule,
    BcryptModule,
    JwtServiceModule,
  ],
  exports: [
    EnvironmentConfigModule,
    DataServicesModule,
    ExceptionsModule,
    LoggerModule,
    BcryptModule,
    JwtServiceModule,
  ],
})
export class ServicesModule {}
