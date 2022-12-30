import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSCloudWatchConfiguration, DBConfiguration } from 'src/configuration';
import { IEnvironmentConfig } from 'src/domain/abstracts/database-config.abstract';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfig {
  constructor(private configService: ConfigService) {}

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
      AWSCloudWatchConfiguration.AWS_ACCESS_KEY,
    );
  }
  getAwsSecretKey(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.AWS_KEY_SECRET,
    );
  }
  getAwsRegion(): string {
    return this.configService.get<string>(
      AWSCloudWatchConfiguration.AWS_REGION,
    );
  }

  getDatabaseHost(): string {
    return this.configService.get<string>(DBConfiguration.POSTGRES_HOST);
  }

  getDatabasePort(): number {
    return this.configService.get<number>(DBConfiguration.POSTGRES_PORT);
  }

  getDatabaseUser(): string {
    return this.configService.get<string>(DBConfiguration.POSTGRES_USER);
  }

  getDatabasePassword(): string {
    return this.configService.get<string>(DBConfiguration.POSTGRES_PASSWORD);
  }

  getDatabaseName(): string {
    return this.configService.get<string>(DBConfiguration.POSTGRES_DB);
  }

  getServerPort(): number {
    return this.configService.get<number>(DBConfiguration.SERVER_PORT);
  }
}
