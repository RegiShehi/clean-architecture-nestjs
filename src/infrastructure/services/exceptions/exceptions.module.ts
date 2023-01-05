import { Module } from '@nestjs/common';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { ExceptionsService } from './exceptions.service';

@Module({
  providers: [
    {
      provide: IException,
      useClass: ExceptionsService,
    },
  ],
  exports: [IException],
})
export class ExceptionsModule {}
