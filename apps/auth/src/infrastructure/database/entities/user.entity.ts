import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { DbEntity } from '../../../../../../libs/shared/src/entities/db-entity';

@Entity('user')
export class UserEntity extends DbEntity {
  constructor(id: string, userName: string, email: string, password: string | null) {
    super(id);
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.lastLogin = null;
    this.hashRefreshToken = null;
  }

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
  lastLogin: Date | null;

  @AutoMap()
  @Column('varchar', { nullable: true })
  hashRefreshToken: string | null;
}
