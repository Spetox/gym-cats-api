import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../gateways/repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(id: string, user: UpdateUserDto) {
    return this.userRepository.update(id, { ...user, updatedAt: new Date() });
  }
}
