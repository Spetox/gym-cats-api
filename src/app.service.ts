import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World!\n\nWelcome to GymCats!</h1>';
  }
}
