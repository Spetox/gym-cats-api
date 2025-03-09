import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../gateways/repositories/user.repository';

@Injectable()
export class FindAllUsersUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<any> {
    return await this.userRepository.findAll();
  }
}
