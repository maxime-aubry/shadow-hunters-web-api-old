import type { IUseCase } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import type { BcryptService } from 'apps/auth/src/infrastructure/services/bcrypt/bcrypt.service';
import type { DoesPasswordMatchUseCaseRequest } from './request.usecase';
import { DoesPasswordMatchUseCaseResponse } from './response.usecase';

@Injectable()
export class DoesPasswordMatchUseCase
  implements IUseCase<DoesPasswordMatchUseCaseRequest, Promise<DoesPasswordMatchUseCaseResponse>>
{
  constructor(@Inject() private bcryptService: BcryptService) {}

  public async execute(request: DoesPasswordMatchUseCaseRequest): Promise<DoesPasswordMatchUseCaseResponse> {
    const doesPasswordMatch: boolean = await this.bcryptService.compare(request.password, request.hashedPassword);
    const response: DoesPasswordMatchUseCaseResponse = new DoesPasswordMatchUseCaseResponse(doesPasswordMatch);
    return response;
  }
}
