import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceProvider } from './module.providers/authService.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    new AuthServiceProvider().getProvider(),
  ],
})
export class AppModule {}
