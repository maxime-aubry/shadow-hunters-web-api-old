import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { DbEntity } from '../../../../../../libs/shared/src/entities/db-entity';

@Entity('user')
export class UserEntity extends DbEntity {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    credentials: LocalCredentials | OAuthCredentials,
  ) {
    super(id);
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.lastLogin = null;
    this.hashRefreshToken = null;
    this.credentials = credentials;
  }

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  public firstname: string;

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  public lastname: string;

  @AutoMap()
  @Column()
  @Column('varchar', { length: 50 })
  public username: string;

  @AutoMap()
  @Column({ unique: true })
  @Column('varchar', { length: 50 })
  public email: string;

  @AutoMap()
  @CreateDateColumn({ name: 'createdate' })
  public createdDate: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updateddate' })
  public updatedDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  public lastLogin: Date | null;

  @AutoMap()
  @Column('varchar', { nullable: true })
  public hashRefreshToken: string | null;

  @Column({ type: 'jsonb' })
  public credentials: LocalCredentials | OAuthCredentials;
}

export type AuthProvider = 'local' | 'facebook' | 'google';

export class UserCredentials {
  constructor(provider: AuthProvider) {
    this.provider = provider;
  }

  public provider: AuthProvider;
}

export class LocalCredentials extends UserCredentials {
  constructor(password: string) {
    super('local');
    this.password = password;
  }

  public password: string;
}

export class OAuthCredentials extends UserCredentials {
  constructor(provider: AuthProvider, providerId: string) {
    super(provider);
    this.providerId = providerId;
  }

  public providerId: string;
}
