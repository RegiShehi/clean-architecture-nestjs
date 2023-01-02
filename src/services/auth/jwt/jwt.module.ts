import { Module } from '@nestjs/common';
import { IJwt } from 'src/domain/abstracts/adapter/jwt.abstract';
import { JwtTokenService } from './jwt.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { JWTConfigModule } from 'src/services/configuration/jwt/jwt-config.module';

export const getJWTModuleOptions = (config: IJWTConfig): JwtModuleOptions =>
  ({
    secret: config.getJWTSecret(),
    signOptions: {
      expiresIn: config.getJWTExpirationTime(),
    },
  } as JwtModuleOptions);

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JWTConfigModule],
      inject: [IJWTConfig],
      useFactory: getJWTModuleOptions,
    }),
  ],
  providers: [
    {
      provide: IJwt,
      useClass: JwtTokenService,
    },
  ],
  exports: [IJwt],
})
export class JwtServiceModule {}
