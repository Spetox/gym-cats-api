import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/gateways/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    const userEntity = new UserTypeormEntity();

    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.password = user.password;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;

    await this.userRepository.save(userEntity);
  }

  async findAll(): Promise<UserEntity[] | []> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    user: Omit<UserEntity, 'id' | 'createdAt'>,
  ): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
