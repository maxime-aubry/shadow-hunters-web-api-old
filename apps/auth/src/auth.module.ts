import { SharedModule, SharedService } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCasesModule } from './domain/useCases/auth-usecases.module';
import { LocalAuthController } from './presentation/controllers/localAuth/local-auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    AuthUseCasesModule,
  ],
  controllers: [LocalAuthController],
  providers: [
    {
      provide: 'ISharedService',
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
