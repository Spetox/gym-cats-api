import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/users/gateways/repositories/user.repository';
import { AuthResponseDto } from '../dtos/auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignInUsecase {
  private readonly jwtExpirationTime: number;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = Number(
      this.configService.get<number>('JWT_EXPIRATION_TIME'),
    );
  }

  async execute(input: SignInDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userRepository.findByEmail(input.email);

      if (bcryptCompareSync(input.password, user.password)) {
        const payload = { sub: user.id, username: user.name };

        return {
          token: this.jwtService.sign(payload),
          expiresIn: this.jwtExpirationTime,
        };
      }
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
