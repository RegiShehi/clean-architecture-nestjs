import { Module } from '@nestjs/common';
import { AWSConfigModule } from './aws/aws-config.module';
import { DatabaseConfigModule } from './database/database-config.module';

@Module({
  imports: [AWSConfigModule, DatabaseConfigModule],
  exports: [AWSConfigModule, DatabaseConfigModule],
})
export class EnvironmentConfigModule {}
