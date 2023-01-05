import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IAWSConfig } from 'src/domain/abstracts/config/aws-config.abstract';
import { AWSConfigService } from './aws-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [
    {
      provide: IAWSConfig,
      useClass: AWSConfigService,
    },
  ],
  exports: [IAWSConfig],
})
export class AWSConfigModule {}
