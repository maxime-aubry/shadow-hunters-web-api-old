import type { DbEntity } from '@app/shared/database/entities/db-entity';
import type { Repository } from 'typeorm';

export class DatabaseRepository<TEntity extends DbEntity> {
  protected entity: Repository<TEntity>;

  constructor(entity: Repository<TEntity>) {
    this.entity = entity;
  }
}
