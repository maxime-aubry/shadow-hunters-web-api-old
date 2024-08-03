import { LocalCredentials, UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IHashService } from '../../../adapters/services/hash/hash.interface';
import { UnauthorizedUserException } from '../../../exceptions/unauthorized-user.exception';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignUpForLocalStrategyUseCaseRequest } from './request';
import { SignUpForLocalStrategyUseCaseResponse } from './response';
import type { ISignUpForLocalStrategyUseCase } from './sign-up.interface';

export class SignUpForLocalStrategyUseCaseImpl implements ISignUpForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly hashService: IHashService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: SignUpForLocalStrategyUseCaseRequest,
  ): Promise<SignUpForLocalStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmailAsync(request.email);

    if (existingUser) throw new UnauthorizedUserException('ExistingEmail');

    const hashedPassword: string = await this.hashService.hashAsync(request.password);
    const userCredentials: LocalCredentials = new LocalCredentials(hashedPassword);
    const newUser: UserEntity = new UserEntity(
      '',
      request.firstname,
      request.lastname,
      request.username,
      request.email,
      userCredentials,
    );
    const savedUser: UserEntity = await this.userRepository.createAsync(newUser);
    return new SignUpForLocalStrategyUseCaseResponse(this.authMappersService.mapper.map(savedUser, UserEntity, User));
  }
}
