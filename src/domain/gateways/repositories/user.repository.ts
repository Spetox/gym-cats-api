import { UserEntity } from 'src/domain/entities';

export interface IUserRepository {
  create(user: UserEntity): Promise<string>;
}
