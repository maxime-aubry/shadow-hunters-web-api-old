// import type { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
// import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// export interface IDatabaseRepository<TEntity> {
//   create(data: DeepPartial<TEntity>): TEntity;
//   createMany(data: DeepPartial<TEntity>[]): TEntity[];
//   update(filter: FindOptionsWhere<TEntity>, data: QueryDeepPartialEntity<TEntity>): Promise<void>;
//   save(data: DeepPartial<TEntity>): Promise<TEntity>;
//   saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]>;
//   findOneById(id: string): Promise<TEntity | null>;
//   findByCondition(filterCondition: FindOneOptions<TEntity>): Promise<TEntity | null>;
//   findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;
//   remove(data: TEntity): Promise<TEntity>;
//   findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]>;
//   preload(entityLike: DeepPartial<TEntity>): Promise<TEntity | undefined>;
// }
