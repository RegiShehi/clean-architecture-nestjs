import { Module } from '@nestjs/common';
import { BcryptModule } from './auth/bcrypt/bcrypt.module';
import { JwtServiceModule } from './auth/jwt/jwt.module';
import { EnvironmentConfigModule } from './configuration/common/environment-config.module';
import { DataServicesModule } from './database/data-services.module';
import { LoggerModule } from './logger/logger.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    LoggerModule,
    BcryptModule,
    JwtServiceModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  exports: [
    EnvironmentConfigModule,
    DataServicesModule,
    LoggerModule,
    BcryptModule,
    JwtServiceModule,
  ],
})
export class ServicesModule {}
