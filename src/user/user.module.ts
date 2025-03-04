import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from 'src/repositories/typeorm/entities/user.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserTypeormEntity])],
  providers: [UserService],
})
export class UserModule {}
