import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dtos/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync<AuthResponseDto>(
        token,
        {
          secret: this.jwtSecret,
        },
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'] as string;
    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
