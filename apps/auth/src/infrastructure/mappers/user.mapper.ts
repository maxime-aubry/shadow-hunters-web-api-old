import { type Mapper, type MappingProfile, createMap } from '@automapper/core';
import { UserWithPassword } from '../../domain/models/userWithPassword.model';
import { UserWithoutPassword } from '../../domain/models/userWithtoutPassword.model';
import { UserEntity } from '../database/entities/user.entity';

const registerUserProfile: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, UserEntity, UserWithoutPassword);
  createMap(mapper, UserEntity, UserWithPassword);
};

export default registerUserProfile;
