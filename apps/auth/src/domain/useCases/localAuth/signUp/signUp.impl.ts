import { LocalAuthSignUpUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignUpUser.dto';
import { LocalAuthSignedUpUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignedUpUser.dto';
import { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { IUsersRepository } from '../../../../infrastructure/database/repositories/user-repository.interface';
import type { IHashService } from '../../../../infrastructure/services/hash/hash.interface';
import { UnauthorizedUserException } from '../../../exceptions/unauthorizedUser.exception';
import { LocalUserModel } from '../../../models/localUser.model';
import type { ISignUpForLocalStrategyUseCase } from './signUp.interface';

export class SignUpForLocalStrategyUseCaseImpl implements ISignUpForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly hashService: IHashService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(request: LocalAuthSignUpUserDto): Promise<LocalAuthSignedUpUserDto> {
    const existingUserEntity: UserEntity | null = await this.userRepository.getUserByEmailAsync(request.email);

    if (existingUserEntity) throw new UnauthorizedUserException('ExistingEmail');

    const newUserModel: LocalUserModel = await this.initializeUserWithHashedPassword(request);
    const signedUpUserDto: LocalAuthSignedUpUserDto = await this.saveUserInDatabase(newUserModel);
    return signedUpUserDto;
  }

  private async initializeUserWithHashedPassword(request: LocalAuthSignUpUserDto): Promise<LocalUserModel> {
    const newUserModel: LocalUserModel = this.authMappersService.mapper.map(
      request,
      LocalAuthSignUpUserDto,
      LocalUserModel,
    );
    newUserModel.password = await this.hashService.hashAsync(request.password);
    return newUserModel;
  }

  private async saveUserInDatabase(newUserModel: LocalUserModel): Promise<LocalAuthSignedUpUserDto> {
    const newUserEntity: UserEntity = this.authMappersService.mapper.map(newUserModel, LocalUserModel, UserEntity);
    const savedUserEntity: UserEntity = await this.userRepository.createAsync(newUserEntity);
    const signedUserDto: LocalAuthSignedUpUserDto = this.authMappersService.mapper.map(
      savedUserEntity,
      UserEntity,
      LocalAuthSignedUpUserDto,
    );
    return signedUserDto;
  }
}
