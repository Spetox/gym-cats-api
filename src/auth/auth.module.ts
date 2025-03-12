import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './interfaces/controllers/auth.controller';
import { SignInUsecase } from './usecases/sign-in.usecase';
import { UserModule } from 'src/users/user.module';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get<number>('JWT_EXPIRATION_TIME')),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [SignInUsecase],
  exports: [SignInUsecase],
})
export class AuthModule {}
