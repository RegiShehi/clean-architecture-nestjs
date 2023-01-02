import { Module } from '@nestjs/common';
import { IJwt } from 'src/domain/abstracts/adapter/jwt.abstract';
import { JwtTokenService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      // signOptions: { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` },
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
