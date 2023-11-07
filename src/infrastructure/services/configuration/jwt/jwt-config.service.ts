import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { JWTConfiguration } from 'src/utils/configuration';

@Injectable()
export class JWTConfigService implements IJWTConfig {
  constructor(public configService: ConfigService) {}

  getJWTSecret(): string {
    return this.configService.get<string>(JWTConfiguration.JWT_SECRET);
  }

  getJWTExpirationTime(): number {
    return parseInt(
      this.configService.get<string>(JWTConfiguration.JWT_EXPIRATION_TIME),
      10,
    );
  }

  getJWTRefreshTokenSecret(): string {
    return this.configService.get<string>(
      JWTConfiguration.JWT_REFRESH_TOKEN_SECRET,
    );
  }

  getJWTRefreshTokenExpirationTime(): number {
    return parseInt(
      this.configService.get<string>(
        JWTConfiguration.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      ),
      10,
    );
  }
}
