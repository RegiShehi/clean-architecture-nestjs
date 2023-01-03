import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private dataServices: IDataServices,
    private exception: IException,
    config: IJWTConfig,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.getJWTSecret(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          //   return request.cookies['Authorization'];
          return request?.cookies?.Authorization;
        },
      ]),
    });
  }

  async validate(payload: IJwtPayload) {
    const user = this.dataServices.users.findByEmail(payload.email);

    if (!user) {
      this.exception.unauthorizedException('User not found');
    }

    return user;
  }
}
