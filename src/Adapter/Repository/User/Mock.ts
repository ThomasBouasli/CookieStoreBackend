import { User } from '@Entity/User';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { IUserRepository } from './Interface';

export const users: User[] = [];

export class MockUserRepository implements IUserRepository {
  async findById(id: string): Promise<Either<Error, User>> {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return new Left(new Error('User not found'));
    }
    return new Right(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }

  async create(user: User): Promise<Either<Error, User>> {
    const userExists = await this.findByEmail(user.email);
    if (userExists) {
      return new Left(new Error('User already exists'));
    }
    users.push(user);
    return new Right(user);
  }
}
