import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './interfaces/controllers/user.controller';
import { UserRepository } from './infrastructure/repositories/typeorm/user.repository';
import { SharedModule } from '../shared/shared.module';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { FindAllUsersUsecase } from './usecases/find-all-users.usecase';
import { FindUserByIdUsecase } from './usecases/find-user-by-id.usecase';
import { UserTypeormEntity } from 'src/database/entities/user.entity';
import { UpdateUserUsecase } from './usecases/update-user.usecase';
import { DeleteUserUsecase } from './usecases/delete-user.usecase';

@Module({
  controllers: [UserController],
  imports: [SharedModule, TypeOrmModule.forFeature([UserTypeormEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    CreateUserUsecase,
    FindAllUsersUsecase,
    FindUserByIdUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
  ],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    CreateUserUsecase,
    FindAllUsersUsecase,
    FindUserByIdUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
  ],
})
export class UserModule {}
