import { Inject, Injectable } from "@nestjs/common";
import { EnvironmentConfigService } from "apps/auth/src/infrastructure/config/environment-config/environment-config.service";
import { DatabaseUserRepository } from "apps/auth/src/infrastructure/database/repositories/user.repository";
import { LoggerService } from "apps/auth/src/infrastructure/logger/logger.service";
import { BcryptService } from "apps/auth/src/infrastructure/services/bcrypt/bcrypt.service";
import { JwtTokenService } from "apps/auth/src/infrastructure/services/jwt/jwt.service";
import { GetCookieWithJwtRefreshTokenUseCase } from "./getCookieWithJwtRefreshToken/usecase";
import { GetCookieWithJwtTokenUseCase } from "./getCookieWithJwtToken/usecase";
import { GetUserIfRefreshTokenMatchesUseCase } from "./getUserIfRefreshTokenMatches/usecase";
import { IsAuthenticatedUseCase } from "./isAuthenticated/usecase";
import { LogOutUseCase } from "./logOut/usecase";
import { ValidateUserForLocalStrategyUseCase } from "./validateUserForLocalStrategy/usecase";

@Injectable()
export class AuthUseCasesCollection {
    constructor(
        @Inject() readonly logger: LoggerService,
        @Inject() readonly jwtTokenService: JwtTokenService,
        @Inject() readonly jwtConfig: EnvironmentConfigService,
        @Inject() readonly userRepository: DatabaseUserRepository,
        @Inject() readonly bcryptService: BcryptService,
    ) {
        this.getCookieWithJwtRefreshTokenUseCase = new GetCookieWithJwtRefreshTokenUseCase(logger, jwtTokenService, jwtConfig, userRepository, bcryptService);
        this.getCookieWithJwtTokenUseCase = new GetCookieWithJwtTokenUseCase(logger, jwtTokenService, jwtConfig);
        this.getUserIfRefreshTokenMatchesUseCase = new GetUserIfRefreshTokenMatchesUseCase(userRepository, bcryptService);
        this.isAuthenticatedUseCase = new IsAuthenticatedUseCase(userRepository);
        this.logOutUseCase = new LogOutUseCase();
        this.validateUserForLocalStrategyUseCase = new ValidateUserForLocalStrategyUseCase(userRepository);
    }

    public getCookieWithJwtRefreshTokenUseCase: GetCookieWithJwtRefreshTokenUseCase;
    public getCookieWithJwtTokenUseCase: GetCookieWithJwtTokenUseCase;
    public getUserIfRefreshTokenMatchesUseCase: GetUserIfRefreshTokenMatchesUseCase;
    public isAuthenticatedUseCase: IsAuthenticatedUseCase;
    public logOutUseCase: LogOutUseCase;
    public validateUserForLocalStrategyUseCase: ValidateUserForLocalStrategyUseCase;
}
