import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserUsecase } from '../../usecases/create-user.usecase';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FindUserByIdUsecase } from '../../usecases/find-user-by-id.usecase';
import { FindAllUsersUsecase } from '../../usecases/find-all-users.usecase';
import { FindUserByIdDto } from '../../dtos/find-user-by-id.dto';
import {
  UpdateUserDto,
  UpdateUserParamsDto,
} from 'src/users/dtos/update-user.dto';
import { UpdateUserUsecase } from 'src/users/usecases/update-user.usecase';
import { DeleteUserUsecase } from 'src/users/usecases/delete-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly findUserByIdUsecase: FindUserByIdUsecase,
    private readonly findAllUsersUsecase: FindAllUsersUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly DeleteUserUsecase: DeleteUserUsecase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUsecase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUsecase.execute();
  }

  @Get(':id')
  findOne(@Param() params: FindUserByIdDto) {
    return this.findUserByIdUsecase.execute({ id: params.id });
  }

  @Patch(':id')
  update(
    @Param() params: UpdateUserParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserUsecase.execute(params.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: UpdateUserParamsDto) {
    return this.DeleteUserUsecase.execute({ id: params.id });
  }
}
