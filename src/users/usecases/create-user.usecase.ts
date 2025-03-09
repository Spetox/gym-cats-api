import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../gateways/repositories/user.repository';
import { IUniqueIdentifierService } from 'src/shared/gateways/services/unique-identifier.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('IUniqueIdentifierService')
    private readonly uniqueIdentifierService: IUniqueIdentifierService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: CreateUserDto): Promise<void> {
    const user = new UserEntity({
      id: this.uniqueIdentifierService.generate(),
      email: request.email,
      name: request.name,
      password: request.password,
    });

    await this.userRepository.create(user);
  }
}
