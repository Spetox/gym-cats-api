import { v4 as uuid } from 'uuid';

interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export class User {
  id: string;
  email: string;
  name: string;
  password: string;

  constructor(ctor: IUser) {
    this.id = ctor.id ?? uuid();
    this.email = ctor.email;
    this.name = ctor.name;
    this.password = ctor.password;
  }
}
