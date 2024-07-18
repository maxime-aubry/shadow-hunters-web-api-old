import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { IProvider } from "./provider";

export class AuthServiceProvider implements IProvider {
    static SERVICE_NAME: string = 'AUTH_SERVICE';

    public getProvider(): Provider {
        const provider: Provider = {
            provide: AuthServiceProvider.SERVICE_NAME,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                console.log('api::AuthServiceProvider');
                const USER: string = configService.get('RABBITMQ_USER');
                const PASSWORD: string = configService.get('RABBITMQ_PASS');
                const HOST: string = configService.get('RABBITMQ_HOST');
                const QUEUE: string = configService.get('RABBITMQ_AUTH_QUEUE');
                
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                        queue: QUEUE,
                        queueOptions: {
                            durable: true,
                        }
                    },
                });
            },
        };

        return provider;
    }
}
