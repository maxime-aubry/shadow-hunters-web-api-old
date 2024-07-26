import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { DbEntity } from '../../../../../../libs/shared/src/entities/db-entity';

@Entity('user')
export class UserEntity extends DbEntity {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string | null,
    createdDate: Date,
    updatedDate: Date,
    lastLogin: Date | undefined,
    hashRefreshToken: string,
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.lastLogin = lastLogin;
    this.hashRefreshToken = hashRefreshToken;
  }

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  firstName: string;

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  lastName: string;

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  userName: string;

  @AutoMap()
  @Column({ unique: true })
  @Column('varchar', { length: 50 })
  email: string;

  @AutoMap()
  @Column({ select: false })
  @Column('varchar', { length: 50 })
  password: string | null;

  @AutoMap()
  @CreateDateColumn({ name: 'createdate' })
  createdDate: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updateddate' })
  updatedDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  lastLogin?: Date;

  @AutoMap()
  @Column('varchar', { nullable: true })
  hashRefreshToken: string;
}
