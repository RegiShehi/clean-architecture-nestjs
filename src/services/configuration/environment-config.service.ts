import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/domain/abstracts/database-config.abstract';

@Injectable()
export class EnvironmentConfigService implements IDatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('POSTGRES_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('POSTGRES_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('POSTGRES_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('POSTGRES_DB');
  }

  getServerPort(): number {
    return this.configService.get<number>('SERVER_PORT');
  }
}
