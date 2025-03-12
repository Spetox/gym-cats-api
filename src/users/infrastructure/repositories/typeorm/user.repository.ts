import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/gateways/repositories/user.repository';
import { Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserTypeormEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const userEntity = new UserTypeormEntity();
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.password = bcryptHashSync(user.password, 10);

    await this.userRepository.save(userEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, user: Omit<UserEntity, 'id'>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
