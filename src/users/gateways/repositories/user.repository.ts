import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  update(id: string, user: Omit<UserEntity, 'id'>): Promise<void>;
  delete(id: string): Promise<void>;
}
