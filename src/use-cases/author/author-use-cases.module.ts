import { Module } from '@nestjs/common';
import { AuthorUseCases } from './author.use-case';
import { DataServicesModule } from 'src/infrastructure/services/database/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [AuthorUseCases],
  exports: [AuthorUseCases],
})
export class AuthorUseCasesModule {}
