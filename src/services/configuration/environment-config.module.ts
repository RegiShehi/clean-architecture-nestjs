import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { IEnvironmentConfig } from 'src/domain/abstracts/database-config.abstract';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
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
