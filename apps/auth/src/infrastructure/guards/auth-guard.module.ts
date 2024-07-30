import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { JwtAuthGuard } from './jwtAuthGuard/jwt-auth.guard';
import { JwtAuthStrategy } from './jwtAuthGuard/jwt-auth.strategy';
import { LocalAuthGuard } from './localAuthGuard/local-auth.guard';
import { LocalAuthStrategy } from './localAuthGuard/local-auth.strategy';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [JwtAuthGuard, JwtAuthStrategy, LocalAuthGuard, LocalAuthStrategy],
})
export class AuthGuardsModule {}
