import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcrypt';
import { IUserRepository } from '@Adapter/Repository';
import { User } from '@Entity/User';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};
export class CreateUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    name,
    email,
    password
  }: CreateUserRequest): Promise<Either<Error, string>> {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password: hashSync(password, 10),
      cookies: []
    };
    const userExists = await this.userRepo.findByEmail(user.email);
    if (userExists) {
      return new Left(new Error('User already exists'));
    }
    const okOrError = await this.userRepo.create(user);

    if (okOrError.isLeft()) {
      return new Left(okOrError.value);
    }

    const token = jwt.sign(user, process.env.JWT_SECRET ?? 'no_env');

    return new Right(token);
  }
}
