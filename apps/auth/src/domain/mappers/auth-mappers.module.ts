import { Module } from '@nestjs/common';
import { AuthMappersServiceImpl } from './auth-mappers-service.impl';

@Module({
  exports: [AuthMappersServiceImpl],
  providers: [
    {
      provide: 'IAuthMappersService',
      useClass: AuthMappersServiceImpl,
    },
  ],
})
export class AuthMappersModule {}
