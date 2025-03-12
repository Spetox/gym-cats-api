import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from 'src/auth/dtos/auth.dto';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { SignInUsecase } from 'src/auth/usecases/sign-in.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUsecase: SignInUsecase) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponseDto> {
    return this.signInUsecase.execute({
      email: signInDto.email,
      password: signInDto.password,
    });
  }
}
