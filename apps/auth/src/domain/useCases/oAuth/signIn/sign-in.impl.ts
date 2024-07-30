import { UserEntity } from '@app/shared';
import { OAuthCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IJwtConfig } from '../../../adapters/config/jwt-config.interface';
import type { IJwtServicePayload } from '../../../adapters/services/jwt/jwt-payload.interface';
import type { IJwtService } from '../../../adapters/services/jwt/jwt-service.interface';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignInUseCaseRequest } from './request';
import { SignInUseCaseResponse } from './response';
import type { ISignInUseCase } from './sign-in.interface';

export class SignInUseCaseImpl implements ISignInUseCase {
  constructor(
    private readonly jwtConfig: IJwtConfig,
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(request: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmail(request.email);

    if (!existingUser) {
      const credentials: OAuthCredentials = new OAuthCredentials(request.provider, request.providerId);
      const newUser: UserEntity = new UserEntity(
        '',
        request.firstname,
        request.lastname,
        request.username,
        request.email,
        credentials,
      );
      const savedUser: UserEntity = this.userRepository.create(newUser);
      return this.generateResponse(savedUser);
    }

    return this.generateResponse(existingUser);
  }

  private generateResponse(user: UserEntity): SignInUseCaseResponse {
    const jwtPayload: IJwtServicePayload = {
      userId: user.id,
      username: user.username,
    };
    const token: string = this.jwtService.createToken(
      jwtPayload,
      this.jwtConfig.getJwtSecret(),
      this.jwtConfig.getJwtExpirationTime(),
    );
    const response: SignInUseCaseResponse = new SignInUseCaseResponse(token);
    return response;
  }
}
