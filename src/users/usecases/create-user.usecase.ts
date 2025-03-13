import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../gateways/repositories/user.repository';
import { IUniqueIdentifierService } from 'src/shared/gateways/services/unique-identifier.service';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('IUniqueIdentifierService')
    private readonly uniqueIdentifierService: IUniqueIdentifierService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: CreateUserDto): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      request.email,
    );

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const password = bcryptHashSync(request.password, 10);

    const user = new UserEntity({
      id: this.uniqueIdentifierService.generate(),
      email: request.email,
      name: request.name,
      password,
    });

    await this.userRepository.create(user);
  }
}
