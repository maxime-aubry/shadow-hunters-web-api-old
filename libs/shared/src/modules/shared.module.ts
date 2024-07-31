import { type DynamicModule, Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, type RmqOptions } from '@nestjs/microservices';
import { SharedService } from '../services/shared.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [
    SharedService,
    //ConfigService
  ],
  exports: [SharedService],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers: Provider[] = [
      {
        provide: service,
        useFactory: (sharedService: SharedService) => {
          const options: RmqOptions = sharedService.getRmqOptions(queue);
          return ClientProxyFactory.create(options);
        },
        inject: [SharedService],
      },
    ];

    const module: DynamicModule = {
      module: SharedModule,
      providers,
      exports: providers,
    };

    return module;
  }
}
