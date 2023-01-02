import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSCloudWatchConfiguration } from 'src/configuration';
import { IAWSConfig } from 'src/domain/abstracts/config/aws-config.abstract';
import { CommonConfigService } from '../common/common-config.service';

@Injectable()
export class AWSConfigService
  extends CommonConfigService
  implements IAWSConfig
{
  constructor(public configService: ConfigService) {
    super(configService);
  }

  getCloudWatchGroupName(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.CLOUDWATCH_GROUP_NAME,
    );
  }

  getCloudWatchStreamName(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.CLOUDWATCH_STREAM_NAME,
    );
  }

  getAwsAccessKey(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.AWS_ACCESS_KEY_ID,
    );
  }

  getAwsSecretKey(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.AWS_SECRET_ACCESS_KEY,
    );
  }

  getAwsRegion(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.AWS_REGION,
    );
  }
}
