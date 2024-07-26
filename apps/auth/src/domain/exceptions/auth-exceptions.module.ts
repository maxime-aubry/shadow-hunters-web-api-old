import { Module } from '@nestjs/common';
import { AuthUseCaseException } from './auth-usecase.exception';

@Module({
  imports: [AuthUseCaseException],
})
export class AuthExceptionsModule {}
