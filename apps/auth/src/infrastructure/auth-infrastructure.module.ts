import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { AuthRepositoriesModule } from './database/repositories/auth-repositories.module';
import { AuthGuardsModule } from './guards/auth-guard.module';
import { LoggerModule } from './logger/logger.module';
import { AuthMappersModule } from './mappers/auth-mappers.module';
import { BcryptModule } from './services/bcrypt/bcrypt.module';
import { JwtModule } from './services/jwt/jwt.module';

@Module({
  imports: [
    AuthGuardsModule,
    AuthMappersModule,
    AuthRepositoriesModule,
    BcryptModule,
    EnvironmentConfigModule,
    JwtModule,
    LoggerModule,
  ],
})
export class AuthInfrastructureModule {}
