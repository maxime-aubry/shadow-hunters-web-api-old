import type { IUseCase } from '@app/shared';
import { Inject } from '@nestjs/common';
import { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import type { AuthMapperService } from 'apps/auth/src/infrastructure/mappers/auth-mappers.service';
import type { IBcryptService } from '../../../adapters/bcrypt.interface';
import { AuthUseCaseException } from '../../../exceptions/auth-usecase.exception';
import { UserWithoutPassword } from '../../../models/userWithtoutPassword.model';
import type { RegisterUserUseCaseRequest } from './request.usecase';
import { RegisterUserUseCaseResponse } from './response.usecase';

export class RegisterUserUseCase implements IUseCase<RegisterUserUseCaseRequest, Promise<RegisterUserUseCaseResponse>> {
  constructor(
    @Inject() private readonly authMapperService: AuthMapperService,
    @Inject() private readonly bcryptService: IBcryptService,
    @Inject() private readonly userRepository: DatabaseUserRepository,
  ) {}

  public async execute(request: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const user: UserEntity | null = await this.userRepository.getUserByEmail(request.email);

    if (user) throw new AuthUseCaseException('An account with that email already exists!');

    const hashedPassword: string = await this.bcryptService.hash(request.password);
    const newUser: UserEntity = new UserEntity('', request.userName, request.email, hashedPassword);
    const savedUser: UserEntity = await this.userRepository.save(newUser);
    const savedUserWithoutPassword: UserWithoutPassword = this.authMapperService
      .getMapper()
      .map(savedUser, UserEntity, UserWithoutPassword);
    const response: RegisterUserUseCaseResponse = new RegisterUserUseCaseResponse(savedUserWithoutPassword);
    return response;
  }
}
