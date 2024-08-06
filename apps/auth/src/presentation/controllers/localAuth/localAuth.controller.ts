import type { IMessageQueueTarget } from '@app/shared/interfaces/services/messageQueue/messageQueueTarget.interface';
import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { LocalAuthSignedUpUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignedUpUser.dto';
import type { ILocalAuthUseCases } from 'apps/auth/src/domain/useCases/localAuth/local-auth-use-cases.interface';
import { SignInForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/signIn/request';
import type { SignInForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/signIn/response';
import { LocalAuthGuard } from 'apps/auth/src/infrastructure/guards/localAuthGuard/local-auth.guard';
import type { Request } from 'express';
import { LocalAuthSignInUserDto } from '../../../application/dtos/localAuth/localAuthSignInUser.dto';
import { LocalAuthSignUpUserDto } from '../../../application/dtos/localAuth/localAuthSignUpUser.dto';

@Controller('local-auth')
@ApiTags('local-auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal server error' })
export class LocalAuthController {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCases: ILocalAuthUseCases) {}

  @Post('signup')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: LocalAuthSignUpUserDto })
  @ApiOperation({ description: 'signUp' })
  @MessagePattern<IMessageQueueTarget>({ target: 'sign-up' })
  public async signUp(@Body() user: LocalAuthSignUpUserDto): Promise<LocalAuthSignedUpUserDto> {
    return await this.localAuthUseCases.signUp.executeAsync(user);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: LocalAuthSignInUserDto })
  public async signIn(
    @Body() auth: LocalAuthSignInUserDto,
    @Req() request: Request,
  ): Promise<SignInForLocalStrategyUseCaseResponse> {
    const signInRequest: SignInForLocalStrategyUseCaseRequest = new SignInForLocalStrategyUseCaseRequest(
      auth.usernameOrEmail,
      auth.password,
    );
    const signInResponse: SignInForLocalStrategyUseCaseResponse =
      await this.localAuthUseCases.signIn.executeAsync(signInRequest);

    request.res?.setHeader('Set-Cookie', [signInResponse.accessTokenCookie, signInResponse.refreshTokenCookie]);

    return signInResponse;
  }
}
