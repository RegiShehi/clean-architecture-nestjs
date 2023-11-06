import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from './auth/auth.use-cases.module';
import { AuthorUseCasesModule } from './author/author-use-cases.module';
import { BookUseCasesModule } from './book/book.use-cases.module';
import { UserUseCasesModule } from './user/user-use-cases.module';

@Module({
  imports: [
    AuthUseCasesModule,
    UserUseCasesModule,
    AuthorUseCasesModule,
    BookUseCasesModule,
  ],
  exports: [
    AuthUseCasesModule,
    UserUseCasesModule,
    AuthorUseCasesModule,
    BookUseCasesModule,
  ],
})
export class UseCasesModule {}
