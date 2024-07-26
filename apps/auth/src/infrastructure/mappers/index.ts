import { classes } from '@automapper/classes';
import { type Mapper, createMapper } from '@automapper/core';
import userProfile from './user.mapper';

// Create and export the mapper
export const mapper: Mapper = createMapper({
  strategyInitializer: classes(),
});

userProfile(mapper);
