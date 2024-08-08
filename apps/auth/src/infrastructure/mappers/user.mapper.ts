import { UserEntity } from '@app/shared';
import { type Mapper, type MappingProfile, createMap } from '@automapper/core';
import { LocalUserModel } from '../../domain/models/localUser.model';

const registerUserProfile: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, UserEntity, LocalUserModel);
  // createMap(
  //   mapper,
  //   UserEntity,
  //   LocalUser,
  //   forMember(
  //     (destination: LocalUser) => destination.password,
  //     convertUsing(getPasswordFormLocalCredentials, (source: UserEntity) => source.credentials),
  //   ),
  // );

  // createMap(
  //   mapper,
  //   UserEntity,
  //   OAuthUser,
  //   forMember(
  //     (destination: OAuthUser) => destination.provider,
  //     mapFrom((source: UserEntity) => source.credentials.provider),
  //   ),
  //   forMember(
  //     (destination: OAuthUser) => destination.providerId,
  //     convertUsing(getProviderIdFromOAuthCredentials, (source: UserEntity) => source.credentials),
  //   ),
  // );
};

// const getPasswordFormLocalCredentials: Converter<UserCredentials, string> = {
//   convert(source: UserCredentials) {
//     if (source instanceof LocalCredentials) return source.password;
//     throw new AuthMapperServiceException('User credentials are not of type LocalCredentials.');
//   },
// };

// const getProviderIdFromOAuthCredentials: Converter<UserCredentials, string> = {
//   convert(source: UserCredentials) {
//     if (source instanceof OAuthCredentials) return source.providerId;
//     throw new AuthMapperServiceException('User credentials are not of type OAuthCredentials.');
//   },
// };

export default registerUserProfile;
