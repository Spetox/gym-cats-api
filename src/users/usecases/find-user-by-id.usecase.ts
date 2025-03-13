import { IUserRepository } from '../gateways/repositories/user.repository';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindUserByIdUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: FindUserByIdDto): Promise<any> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
