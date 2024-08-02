import type { DbEntity } from '@app/shared/entities/db-entity';
import type { Repository } from 'typeorm';

export class DatabaseRepository<TEntity extends DbEntity> {
  protected entity: Repository<TEntity>;

  constructor(entity: Repository<TEntity>) {
    this.entity = entity;
  }
}
