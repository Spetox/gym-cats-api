import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from 'src/repositories/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<void> {
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

  async findAll(): Promise<UserTypeormEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserTypeormEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
