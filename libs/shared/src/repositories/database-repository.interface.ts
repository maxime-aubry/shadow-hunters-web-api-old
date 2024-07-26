import type { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

// biome-ignore lint/style/useNamingConvention: IGenericRepository
export interface IDatabaseRepository<TEntity> {
  create(data: DeepPartial<TEntity>): TEntity;
  createMany(data: DeepPartial<TEntity>[]): TEntity[];
  save(data: DeepPartial<TEntity>): Promise<TEntity>;
  saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]>;
  findOneById(id: string): Promise<TEntity | null>;
  findByCondition(filterCondition: FindOneOptions<TEntity>): Promise<TEntity | null>;
  findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;
  remove(data: TEntity): Promise<TEntity>;
  findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]>;
  preload(entityLike: DeepPartial<TEntity>): Promise<TEntity | undefined>;
}
