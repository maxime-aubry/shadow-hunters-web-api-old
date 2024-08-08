import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
  ],
  exports: ['ILoggerService'],
})
export class LoggerModule {}
