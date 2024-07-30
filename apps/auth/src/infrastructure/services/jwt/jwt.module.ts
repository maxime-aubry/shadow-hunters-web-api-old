import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    {
      provide: 'IJwtService',
      useClass: JwtTokenService,
    },
  ],
  exports: ['IJwtService'],
})
export class JwtModule {}
