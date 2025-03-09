import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../gateways/repositories/user.repository';
import { DeleteUserDto } from '../dtos/delete-user.dto';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: DeleteUserDto): Promise<void> {
    return await this.userRepository.delete(input.id);
  }
}
