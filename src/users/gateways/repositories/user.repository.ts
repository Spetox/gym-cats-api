import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  findAll(): Promise<UserEntity[] | []>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<void>;
  delete(id: string): Promise<void>;
}
