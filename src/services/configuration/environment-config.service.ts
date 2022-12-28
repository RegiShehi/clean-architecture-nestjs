import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/configuration';
import { IDatabaseConfig } from 'src/domain/abstracts/database-config.abstract';

@Injectable()
export class EnvironmentConfigService implements IDatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>(Configuration.POSTGRES_HOST);
  }

  getDatabasePort(): number {
    return this.configService.get<number>(Configuration.POSTGRES_PORT);
  }

  getDatabaseUser(): string {
    return this.configService.get<string>(Configuration.POSTGRES_USER);
  }

  getDatabasePassword(): string {
    return this.configService.get<string>(Configuration.POSTGRES_PASSWORD);
  }

  getDatabaseName(): string {
    return this.configService.get<string>(Configuration.POSTGRES_DB);
  }

  getServerPort(): number {
    return this.configService.get<number>(Configuration.SERVER_PORT);
  }
}
