import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataBaseConfig } from 'src/domain/abstracts/config/database-config.abstract';
import { DBConfiguration } from 'src/utils/configuration';

@Injectable()
export class DatabaseConfigService implements IDataBaseConfig {
  constructor(public configService: ConfigService) {}

  public getServerPort(): number {
    return this.configService.get<number>(DBConfiguration.SERVER_PORT);
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
}
