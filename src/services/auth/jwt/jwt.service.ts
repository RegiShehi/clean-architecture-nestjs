import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwt, IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';

@Injectable()
export class JwtTokenService implements IJwt {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createToken(payload: IJwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
