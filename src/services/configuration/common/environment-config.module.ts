import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AWSConfigModule } from '../aws/aws-config.module';
import { DatabaseConfigModule } from '../database/database-config.module';
import { IEnvironmentConfig } from 'src/domain/abstracts/config/environment-config.abstract';
import { EnvironmentConfigService } from './environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AWSConfigModule,
    DatabaseConfigModule,
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
