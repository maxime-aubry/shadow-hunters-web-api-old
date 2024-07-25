import { UserEntity } from '@app/shared';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friend-request')
export class FriendRequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.friendRequestCreator)
    creator: UserEntity;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.friendRequestReceiver)
    receiver: UserEntity;
}
