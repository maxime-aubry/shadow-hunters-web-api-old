import { Module } from '@nestjs/common';
import { AuthMappersServiceImpl } from './authMappers.service.impl';

@Module({
  providers: [
    {
      provide: 'IAuthMappersService',
      useClass: AuthMappersServiceImpl,
    },
  ],
  exports: ['IAuthMappersService'],
})
export class AuthMappersModule {}
