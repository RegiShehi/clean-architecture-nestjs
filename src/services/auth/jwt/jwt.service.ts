import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwt, IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';

@Injectable()
export class JwtTokenService implements IJwt {
  constructor(private readonly jwtService: JwtService) {}

  createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
