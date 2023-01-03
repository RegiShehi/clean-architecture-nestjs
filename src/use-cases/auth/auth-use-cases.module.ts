import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data/data-services.module';
import { AuthUseCases } from './auth.use-case';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { BcryptModule } from 'src/services/auth/bcrypt/bcrypt.module';

@Module({
  imports: [DataServicesModule, ExceptionsModule, BcryptModule],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
