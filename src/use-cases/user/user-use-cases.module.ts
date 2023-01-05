import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { DataServicesModule } from 'src/infrastructure/services/database/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
