import { Module } from '@nestjs/common';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { AuthorController } from './controllers/author.controller';
import { DataServicesModule } from './services/data/data-services.module';
import { ConfigModule } from '@nestjs/config';
import { BookController } from './controllers/book.controller';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';

@Module({
  imports: [
    DataServicesModule,
    AuthorUseCasesModule,
    BookUseCasesModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AuthorController, BookController],
  providers: [],
})
export class AppModule {}
