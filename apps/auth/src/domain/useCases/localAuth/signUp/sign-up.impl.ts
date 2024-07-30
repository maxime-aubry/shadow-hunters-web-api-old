import { LocalCredentials, UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import { AuthUseCaseException } from '../../../exceptions/auth-usecase.exception';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignUpForLocalStrategyUseCaseRequest } from './request';
import { SignUpForLocalStrategyUseCaseResponse } from './response';
import type { ISignUpForLocalStrategyUseCase } from './sign-up.interface';

export class SignUpForLocalStrategyUseCaseImpl implements ISignUpForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: SignUpForLocalStrategyUseCaseRequest,
  ): Promise<SignUpForLocalStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmail(request.email);

    if (existingUser) throw new AuthUseCaseException('An account with that email already exists!');

    const hashedPassword: string = await this.bcryptService.hashAsync(request.password);
    const userCredentials: LocalCredentials = new LocalCredentials(hashedPassword);
    const newUser: UserEntity = new UserEntity(
      '',
      request.firstname,
      request.lastname,
      request.username,
      request.email,
      userCredentials,
    );
    const savedUser: UserEntity = await this.userRepository.save(newUser);
    return this.generateResponse(savedUser);
  }

  public generateResponse(user: UserEntity): SignUpForLocalStrategyUseCaseResponse {
    const mappedUser: User = this.authMappersService.mapper.map(user, UserEntity, User);
    const response: SignUpForLocalStrategyUseCaseResponse = new SignUpForLocalStrategyUseCaseResponse(mappedUser);
    return response;
  }
}
