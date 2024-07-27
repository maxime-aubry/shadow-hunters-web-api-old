// // // modules
// // export * from './modules/shared.module';
// // export * from './modules/postgresdb.module';
// // // services
// // export * from './services/shared.service';
// // // guards
// // export * from './guards/auth.guard';
// // // entities
// // export * from './entities/user.entity';
// // export * from './entities/friend-request.entity';
// // export * from './entities/conversation.entity';
// // export * from './entities/message.entity';
// // // interfaces - user/shared
// // export * from './interfaces/user-request.interface';
// // export * from './interfaces/user-jwt.interface';
// // export * from './interfaces/shared.service.interface';
// // // interfaces - repository
// // export * from './interfaces/users.repository.interface';
// // export * from './interfaces/friend-requests.repository.interface';
// // export * from './interfaces/conversations.repository.interface';
// // export * from './interfaces/messages.repository.interface';
// // // base repository
// // export * from './repositories/base/base.abstract.repository';
// // export * from './repositories/base/base.interface.repository';
// // // repositories
// // export * from './repositories/users.repository';
// // export * from './repositories/friend-requests.repository';
// // export * from './repositories/conversations.repository';
// // export * from './repositories/messages.repository';
// // // interceptors
// // export * from './interceptors/user.interceptor';

// // entities
// import { DbEntity } from './entities/entity';
// import { UserEntity } from './entities/user.entity';
// // guards
// import { AuthGuard } from './guards/auth.guard';
// // interceptors
// import { SharedServiceInterface } from './interfaces/shared.service.interface';
// // interfaces - repository
// import { UserRepositoryInterface } from './interfaces/users.repository.interface';
// import { PostgresDbModule } from './modules/postgresdb.module';
// // modules
// import { SharedModule } from './modules/shared.module';
// // base repository
// import { BaseAbstractRepository } from './repositories/base/base.abstract.repository';
// import { BaseInterfaceRepository } from './repositories/base/base.interface.repository';
// // repositories
// import { UsersRepository } from './repositories/users.repository';
// // services
// import { SharedService } from './services/shared.service';

// export {
//   PostgresDbModule,
//   SharedService,
//   AuthGuard,
//   DbEntity,
//   UserEntity,
//   SharedServiceInterface,
//   UserRepositoryInterface,
//   BaseAbstractRepository,
//   BaseInterfaceRepository,
//   UsersRepository,
//   SharedModule,
// };

import { DbEntity } from './entities/db-entity';
import { SharedModule } from './modules/shared.module';
import { DatabaseRepository } from './repositories/database-repository';
import { IDatabaseRepository } from './repositories/database-repository.interface';
import { SharedService } from './services/shared.service';
import { IUseCase } from './useCases/usecases.interface';

export { DatabaseRepository, DbEntity, IDatabaseRepository, IUseCase, SharedModule, SharedService };
