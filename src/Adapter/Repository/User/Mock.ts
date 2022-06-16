import { User } from '@Entity/User';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { IUserRepository } from './Interface';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<Either<Error, User>> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return new Left(new Error('User not found'));
    }
    return new Right(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: User): Promise<Either<Error, User>> {
    const userExists = await this.findByEmail(user.email);
    if (userExists) {
      return new Left(new Error('User already exists'));
    }
    this.users.push(user);
    return new Right(user);
  }

  async update(user: User): Promise<Either<Error, User>> {
    const userExists = await this.findById(user.id);
    if (!userExists) {
      return new Left(new Error('User not found'));
    }

    const index = this.users.findIndex((u) => u.id === user.id);

    this.users[index] = user;

    return new Right(user);
  }
}
