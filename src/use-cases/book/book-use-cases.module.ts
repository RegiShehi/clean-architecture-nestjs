import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data/data-services.module';
import { BookUseCases } from './book.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [BookUseCases],
  exports: [BookUseCases],
})
export class BookUseCasesModule {}
