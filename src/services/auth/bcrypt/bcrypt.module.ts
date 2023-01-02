import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';

@Module({
  providers: [
    {
      provide: IBcrypt,
      useClass: BcryptService,
    },
  ],
  exports: [IBcrypt],
})
export class BcryptModule {}
