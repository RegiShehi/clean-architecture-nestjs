import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AWSConfigModule } from '../aws/aws-config.module';
import { DatabaseConfigModule } from '../database/database-config.module';
import { IEnvironmentConfig } from 'src/domain/abstracts/config/environment-config.abstract';
import { EnvironmentConfigService } from './environment-config.service';
import { JWTConfigModule } from '../jwt/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AWSConfigModule,
    DatabaseConfigModule,
    JWTConfigModule,
  ],
  providers: [
    {
      provide: IEnvironmentConfig,
      useClass: EnvironmentConfigService,
    },
  ],
  exports: [IEnvironmentConfig],
})
export class EnvironmentConfigModule {}
