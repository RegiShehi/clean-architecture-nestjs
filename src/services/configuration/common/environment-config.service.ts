// import { Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBConfiguration } from 'src/configuration';
import { IAWSConfig } from 'src/domain/abstracts/config/aws-config.abstract';
import { IDataBaseConfig } from 'src/domain/abstracts/config/database-config.abstract';
import { IEnvironmentConfig } from 'src/domain/abstracts/config/environment-config.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfig {
  constructor(
    public configService: ConfigService,
    public db: IDataBaseConfig,
    public logger: IAWSConfig,
    public jwt: IJWTConfig,
  ) {}

  public getServerPort(): number {
    return this.configService.get<number>(DBConfiguration.SERVER_PORT);
  }
}
