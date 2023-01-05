import { Module } from '@nestjs/common';
import { ILogger } from 'src/domain/abstracts/logger-services.abstract';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: ILogger,
      useClass: LoggerService,
    },
  ],
  exports: [ILogger],
})
export class LoggerModule {}
