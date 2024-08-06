import { Module } from '@nestjs/common';
import { AuthMappersModule } from '../../infrastructure/mappers/authMappers.module';
import { LocalAuthPresenters } from './localAuth/localAuthPresenters';

@Module({
  imports: [AuthMappersModule],
  providers: [
    {
      provide: 'ILocalAuthPresenters',
      useClass: LocalAuthPresenters,
    },
  ],
  exports: ['ILocalAuthPresenters'],
})
export class AuthPresentersModule {}
