import { UserEntity } from '../entities';
import { IUserRepository } from '../gateways/repositories';

interface CreateUserUsecaseRequest {
  username: string;
  password: string;
}

interface CreateUserUsecaseRespose {
  id: string;
}

export class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    request: CreateUserUsecaseRequest,
  ): Promise<CreateUserUsecaseRespose> {
    const user = new UserEntity(request);
    const id = await this.userRepository.create(user);
    return { id };
  }
}
