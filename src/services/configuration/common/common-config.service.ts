// import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBConfiguration } from 'src/configuration';
import { IGeneralConfig } from 'src/domain/abstracts/config/general-config.abstract';

export class CommonConfigService implements IGeneralConfig {
  constructor(public configService: ConfigService) {}

  public getServerPort(): number {
    return this.configService.get<number>(DBConfiguration.SERVER_PORT);
  }
}
