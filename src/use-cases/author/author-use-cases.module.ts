import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data/data-services.module';
import { AuthorUseCases } from './author.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [AuthorUseCases],
  exports: [AuthorUseCases],
})
export class AuthorUseCasesModule {}
