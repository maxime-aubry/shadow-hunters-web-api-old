import { UserEntity } from '@app/shared';
import { type Mapper, type MappingProfile, createMap } from '@automapper/core';
import { User } from '../models/user.model';

const registerUserProfile: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, UserEntity, User);
};

export default registerUserProfile;
