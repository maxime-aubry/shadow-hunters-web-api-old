import { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import { DbEntity } from './entities/db-entity';
import { SharedModule } from './modules/shared.module';
import { DatabaseRepository } from './repositories/database-repository';
import type { IDatabaseRepository } from './repositories/database-repository.interface';
import { SharedService } from './services/shared.service';
import type { IUseCase } from './useCases/usecases.interface';

export {
  DatabaseRepository,
  DbEntity,
  SharedModule,
  SharedService,
  UserEntity,
  type IDatabaseRepository,
  type IUseCase,
};
