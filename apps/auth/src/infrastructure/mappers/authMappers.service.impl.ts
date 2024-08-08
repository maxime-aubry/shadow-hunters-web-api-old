import { classes } from '@automapper/classes';
import { type Mapper, createMapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import type { IAuthMappersService } from './authMappers.service.interface';
import registerUserProfile from './user.mapper';

@Injectable()
export class AuthMappersServiceImpl implements IAuthMappersService {
  public readonly mapper: Mapper;

  constructor() {
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });

    registerUserProfile(this.mapper);
  }
}
