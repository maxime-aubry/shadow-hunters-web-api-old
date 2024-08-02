import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtRefreshTokenGeneratorServiceImpl } from './jwt-refresh-token-generator-service.impl';
import { JwtTokenGeneratorServiceImpl } from './jwt-token-generator-service.impl';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    EnvironmentConfigModule,
  ],
  providers: [
    {
      provide: 'IJwtTokenGenerator',
      useClass: JwtTokenGeneratorServiceImpl,
    },
    {
      provide: 'IJwtRefreshTokenGenerator',
      useClass: JwtRefreshTokenGeneratorServiceImpl,
    },
  ],
  exports: ['IJwtTokenGenerator', 'IJwtRefreshTokenGenerator'],
})
export class JwtModule {}
