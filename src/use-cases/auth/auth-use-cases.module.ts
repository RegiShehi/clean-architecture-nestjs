import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data/data-services.module';
import { AuthUseCases } from './auth.use-case';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { BcryptModule } from 'src/services/auth/bcrypt/bcrypt.module';
import { JWTConfigModule } from 'src/services/configuration/jwt/jwt-config.module';
import { JwtServiceModule } from 'src/services/auth/jwt/jwt.module';
import { JwtStrategy } from 'src/services/auth/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from 'src/services/auth/strategies/jwt-refresh-token.strategy';

@Module({
  imports: [
    DataServicesModule,
    ExceptionsModule,
    BcryptModule,
    JWTConfigModule,
    JwtServiceModule,
  ],
  providers: [AuthUseCases, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
