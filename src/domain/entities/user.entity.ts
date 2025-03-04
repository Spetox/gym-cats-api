interface IUserEntity {
  id?: string;
  username: string;
  password: string;
}

export class UserEntity {
  readonly id: string;
  username: string;
  password: string;

  constructor(ctor: IUserEntity) {
    this.id = ctor.id ?? ' ';
    this.username = ctor.username;
    this.password = ctor.password;
  }
}
