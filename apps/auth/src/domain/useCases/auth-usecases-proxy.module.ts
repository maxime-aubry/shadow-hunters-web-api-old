import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigModule } from '../../infrastructure/config/environment-config/environment-config.module';
import { AuthRepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { BcryptModule } from '../../infrastructure/services/bcrypt/bcrypt.module';
import { AuthExceptionsModule } from '../exceptions/auth-exceptions.module';
import { AuthUseCasesCollection } from './auth';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    AuthRepositoriesModule,
    AuthExceptionsModule,
  ],
  providers: [AuthUseCasesCollection],
  exports: [AuthUseCasesCollection],
})
export class AuthorUseCasesModule {}
