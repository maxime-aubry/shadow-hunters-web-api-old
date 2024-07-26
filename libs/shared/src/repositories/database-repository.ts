import type { DbEntity } from '@app/shared/entities/db-entity';
import type { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import type { IDatabaseRepository } from './database-repository.interface';

// biome-ignore lint/style/useNamingConvention: TEntity
export class DatabaseRepository<TEntity extends DbEntity> implements IDatabaseRepository<TEntity> {
  private entity: Repository<TEntity>;

  constructor(entity: Repository<TEntity>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    return await this.entity.save(data);
  }

  public create(data: DeepPartial<TEntity>): TEntity {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<TEntity>[]): TEntity[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<TEntity | null> {
    const options: FindOptionsWhere<TEntity> = {
      id,
    };
    return await this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<TEntity>): Promise<TEntity | null> {
    return await this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return await this.entity.find(options);
  }

  public async remove(data: TEntity): Promise<TEntity> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<TEntity>): Promise<TEntity | undefined> {
    return await this.entity.preload(entityLike);
  }
}
