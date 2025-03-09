interface IUserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class UserEntity {
  readonly id: string;
  email: string;
  name: string;
  password: string;

  constructor(ctor: IUserEntity) {
    this.id = ctor.id;
    this.email = ctor.email;
    this.name = ctor.name;
    this.password = ctor.password;
  }
}
