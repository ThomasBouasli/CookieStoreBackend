import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { IUserRepository } from '../User';
import { ICookieRepository } from './Interface';

export class MockCookieRepository implements ICookieRepository {
  constructor(private userRepo: IUserRepository) {}

  private cookies: Cookie[] = [];

  async create(cookie: Cookie): Promise<Either<Error, Cookie>> {
    if (this.cookies.find((c) => c.id === cookie.id)) {
      return new Left(new Error('Cookie already exists'));
    }

    this.cookies.push(cookie);

    const userOrError = await this.userRepo.findById(cookie.owner.id);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    user.cookies.push(cookie);

    await this.userRepo.update(user);

    return new Right(cookie);
  }
}
