import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, user: Omit<UserEntity, 'id'>): Promise<void>;
  delete(id: string): Promise<void>;
}
