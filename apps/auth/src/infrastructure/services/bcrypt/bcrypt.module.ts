import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [
    {
      provide: 'IBcryptService',
      useClass: BcryptService,
    },
  ],
  exports: [BcryptService],
})
export class BcryptModule {}
