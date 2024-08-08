import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';

const ignoreEnvFile = (): boolean => {
  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') return false;
  return true;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: ignoreEnvFile(),
      isGlobal: true,
      validate,
    }),
    EnvironmentConfigModule,
  ],
  providers: [
    {
      provide: 'IMessageQueueConfig',
      useClass: EnvironmentConfigService,
    },
    {
      provide: 'IDatabaseConfig',
      useClass: EnvironmentConfigService,
    },
    {
      provide: 'IJwtConfig',
      useClass: EnvironmentConfigService,
    },
    {
      provide: 'IGoogleOauthConfig',
      useClass: EnvironmentConfigService,
    },
    {
      provide: 'IFacebookOauthConfig',
      useClass: EnvironmentConfigService,
    },
  ],
  exports: ['IMessageQueueConfig', 'IDatabaseConfig', 'IJwtConfig', 'IGoogleOauthConfig', 'IFacebookOauthConfig'],
})
export class EnvironmentConfigModule {}
