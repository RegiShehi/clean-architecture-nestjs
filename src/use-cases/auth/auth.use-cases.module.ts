import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/infrastructure/services/auth/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/infrastructure/services/auth/jwt/jwt.module';
import { JwtRefreshTokenStrategy } from 'src/infrastructure/services/auth/jwt/strategies/jwt-refresh-token.strategy';
import { JwtStrategy } from 'src/infrastructure/services/auth/jwt/strategies/jwt.strategy';
import { JWTConfigModule } from 'src/infrastructure/services/configuration/jwt/jwt-config.module';
import { DataServicesModule } from 'src/infrastructure/services/database/data-services.module';
import { AuthUseCases } from './auth.use-case';
import { UserProfile } from 'src/infrastructure/common/profiles/user.profile';

@Module({
  imports: [
    DataServicesModule,
    BcryptModule,
    JWTConfigModule,
    JwtServiceModule,
  ],
  providers: [AuthUseCases, JwtStrategy, JwtRefreshTokenStrategy, UserProfile],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
