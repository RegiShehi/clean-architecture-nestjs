import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';
import { ILogger } from 'src/domain/abstracts/logger-services.abstract';

@Module({
  providers: [
    {
      provide: ILogger,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [ILogger],
})
export class LoggerModule {}
