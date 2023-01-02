import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data/data-services.module';
import { UserUseCases } from './user.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
