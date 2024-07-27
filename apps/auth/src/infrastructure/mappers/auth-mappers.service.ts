import { classes } from '@automapper/classes';
import { type Mapper, createMapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import registerUserProfile from './user.mapper';

@Injectable()
export class AuthMapperService {
  private mapper: Mapper;

  constructor() {
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });

    registerUserProfile(this.mapper);
  }

  public getMapper(): Mapper {
    return this.mapper;
  }
}
