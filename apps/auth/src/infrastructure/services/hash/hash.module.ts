import { Module } from '@nestjs/common';
import { HashService } from './hash.service.impl';

@Module({
  providers: [
    {
      provide: 'IHashService',
      useClass: HashService,
    },
  ],
  exports: ['IHashService'],
})
export class HashModule {}
