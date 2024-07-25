import {
    ConversationEntity,
    FriendRequestEntity,
    FriendRequestsRepository,
    MessageEntity,
    PostgresDBModule,
    SharedModule,
    SharedService,
    UserEntity,
    UsersRepository,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { JwtGuard } from './jwt.guard';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '3600s' },
            }),
            inject: [ConfigService],
        }),
        SharedModule,
        PostgresDBModule,
        TypeOrmModule.forFeature([
            UserEntity,
            FriendRequestEntity,
            ConversationEntity,
            MessageEntity,
        ]),
    ],
    controllers: [AuthController],
    providers: [
        JwtGuard,
        JwtStrategy,
        {
            provide: 'AuthServiceInterface',
            useClass: AuthService,
        },
        {
            provide: 'UsersRepositoryInterface',
            useClass: UsersRepository,
        },
        {
            provide: 'SharedServiceInterface',
            useClass: SharedService,
        },
        {
            provide: 'FriendRequestsRepositoryInterface',
            useClass: FriendRequestsRepository,
        },
    ],
})
export class AuthModule {}
