import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { ICookieRepository } from './Interface';

export class MockCookieRepository implements ICookieRepository {
  private cookies: Cookie[] = [];

  async create(cookie: Cookie): Promise<Either<Error, Cookie>> {
    if (this.cookies.find((c) => c.id === cookie.id)) {
      return new Left(new Error('Cookie already exists'));
    }

    this.cookies.push(cookie);

    return new Right(cookie);
  }
}
