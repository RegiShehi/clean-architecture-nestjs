import { Module } from '@nestjs/common';
import { BookUseCases } from './book.use-case';
import { DataServicesModule } from 'src/infrastructure/services/database/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [BookUseCases],
  exports: [BookUseCases],
})
export class BookUseCasesModule {}
