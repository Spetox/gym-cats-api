interface IUserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  readonly id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(ctor: IUserEntity) {
    this.id = ctor.id;
    this.email = ctor.email;
    this.name = ctor.name;
    this.password = ctor.password;
    this.createdAt = ctor.createdAt ?? new Date();
    this.updatedAt = ctor.updatedAt ?? new Date();
  }
}
