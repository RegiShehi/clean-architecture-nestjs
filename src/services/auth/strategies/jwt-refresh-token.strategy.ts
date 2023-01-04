import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private dataServices: IDataServices,
    private exception: IException,
    private bcrypt: IBcrypt,
    config: IJWTConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: config.getJWTRefreshTokenSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: IJwtPayload) {
    const refreshToken = request?.cookies?.Refresh;

    const user = await this.dataServices.users.findByEmail(payload.email);

    if (!user) {
      this.exception.unauthorizedException('User not found');
    }

    const isRefreshTokenMatching = await this.bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatching) {
      throw this.exception.badRequestException('Wrong credentials provided');
    }

    return user;
  }
}
