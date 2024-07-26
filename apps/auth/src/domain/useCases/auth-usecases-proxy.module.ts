import { UseCaseProxy } from '@app/shared/useCases/usecases-proxy';
import { type DynamicModule, Module, type Provider } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../../infrastructure/config/environment-config/environment-config.service';
import { AuthRepositoriesModule } from '../../infrastructure/database/repositories/repositories.module';
import { DatabaseUserRepository } from '../../infrastructure/database/repositories/user.repository';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { BcryptModule } from '../../infrastructure/services/bcrypt/bcrypt.module';
import { BcryptService } from '../../infrastructure/services/bcrypt/bcrypt.service';
import { JwtModule } from '../../infrastructure/services/jwt/jwt.module';
import { JwtTokenService } from '../../infrastructure/services/jwt/jwt.service';
import { AuthExceptionsModule } from '../exceptions/auth-exceptions.module';
import { GetCookieWithJwtRefreshTokenUseCase } from './auth/getCookieWithJwtRefreshToken/usecase';
import { GetCookieWithJwtTokenUseCase } from './auth/getCookieWithJwtToken/usecase';
import { GetUserIfRefreshTokenMatchesUseCase } from './auth/getUserIfRefreshTokenMatches/usecase';
import { IsAuthenticatedUseCase } from './auth/isAuthenticated/usecase';
import { LogOutUseCase } from './auth/logOut/usecase';
import { ValidateUserForLocalStrategyUseCase } from './auth/validateUserForLocalStrategy/usecase';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    AuthRepositoriesModule,
    AuthExceptionsModule,
  ],
})
export class AuthUseCasesProxyModule {
  static getCookieWithJwtRefreshToken = 'GetCookieWithJwtRefreshTokenUseCase';
  static getCookieWithJwtTokenUseCase = 'GetCookieWithJwtTokenUseCase';
  static getUserIfRefreshTokenMatchesUseCase = 'GetUserIfRefreshTokenMatchesUseCase';
  static isAuthenticatedUseCase = 'IsAuthenticatedUseCase';
  static logOutUseCase = 'LogOutUseCase';
  static validateUserForLocalStrategyUseCase = 'ValidateUserForLocalStrategyUseCase';

  static register(): DynamicModule {
    const providers: Provider[] = [
      {
        inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
        provide: AuthUseCasesProxyModule.getCookieWithJwtRefreshToken,
        useFactory: (
          logger: LoggerService,
          jwtTokenService: JwtTokenService,
          jwtConfig: EnvironmentConfigService,
          userRepository: DatabaseUserRepository,
          bcryptService: BcryptService,
        ) =>
          new UseCaseProxy(
            new GetCookieWithJwtRefreshTokenUseCase(logger, jwtTokenService, jwtConfig, userRepository, bcryptService),
          ),
      },
      {
        inject: [LoggerService, JwtTokenService, EnvironmentConfigService],
        provide: AuthUseCasesProxyModule.getCookieWithJwtTokenUseCase,
        useFactory: (logger: LoggerService, jwtTokenService: JwtTokenService, jwtConfig: EnvironmentConfigService) =>
          new UseCaseProxy(new GetCookieWithJwtTokenUseCase(logger, jwtTokenService, jwtConfig)),
      },
      {
        inject: [DatabaseUserRepository, BcryptService],
        provide: AuthUseCasesProxyModule.getUserIfRefreshTokenMatchesUseCase,
        useFactory: (userRepository: DatabaseUserRepository, bcryptService: BcryptService) =>
          new UseCaseProxy(new GetUserIfRefreshTokenMatchesUseCase(userRepository, bcryptService)),
      },
      {
        inject: [DatabaseUserRepository],
        provide: AuthUseCasesProxyModule.isAuthenticatedUseCase,
        useFactory: (userRepository: DatabaseUserRepository) =>
          new UseCaseProxy(new IsAuthenticatedUseCase(userRepository)),
      },
      {
        inject: [],
        provide: AuthUseCasesProxyModule.logOutUseCase,
        useFactory: () => new UseCaseProxy(new LogOutUseCase()),
      },
      {
        inject: [DatabaseUserRepository],
        provide: AuthUseCasesProxyModule.validateUserForLocalStrategyUseCase,
        useFactory: (userRepository: DatabaseUserRepository) =>
          new UseCaseProxy(new ValidateUserForLocalStrategyUseCase(userRepository)),
      },
    ];

    const dynamicModule: DynamicModule = {
      module: AuthUseCasesProxyModule,
      providers,
      exports: [
        AuthUseCasesProxyModule.getCookieWithJwtRefreshToken,
        AuthUseCasesProxyModule.getCookieWithJwtTokenUseCase,
      ],
    };

    return dynamicModule;
  }
}
