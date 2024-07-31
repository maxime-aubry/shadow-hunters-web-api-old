import type { DbEntity } from '@app/shared/entities/db-entity';
import type { Repository } from 'typeorm';

export class DatabaseRepository<TEntity extends DbEntity> {
  protected entity: Repository<TEntity>;

  constructor(entity: Repository<TEntity>) {
    this.entity = entity;
  }

  // public async update(filter: FindOptionsWhere<TEntity>, data: QueryDeepPartialEntity<TEntity>): Promise<void> {
  //   await this.entity.update(filter, data);
  // }

  // public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
  //   return await this.entity.save(data);
  // }

  // public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
  //   return await this.entity.save(data);
  // }

  // public create(data: DeepPartial<TEntity>): TEntity {
  //   return this.entity.create(data);
  // }

  // public createMany(data: DeepPartial<TEntity>[]): TEntity[] {
  //   return this.entity.create(data);
  // }

  // public async findOneById(id: any): Promise<TEntity | null> {
  //   const options: FindOptionsWhere<TEntity> = {
  //     id,
  //   };
  //   return await this.entity.findOneBy(options);
  // }

  // public async findByCondition(filterCondition: FindOneOptions<TEntity>): Promise<TEntity | null> {
  //   return await this.entity.findOne(filterCondition);
  // }

  // public async findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]> {
  //   return await this.entity.find(relations);
  // }

  // public async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
  //   return await this.entity.find(options);
  // }

  // public async remove(data: TEntity): Promise<TEntity> {
  //   return await this.entity.remove(data);
  // }

  // public async preload(entityLike: DeepPartial<TEntity>): Promise<TEntity | undefined> {
  //   return await this.entity.preload(entityLike);
  // }
}
