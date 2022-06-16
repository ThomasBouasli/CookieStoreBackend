import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { users } from '../User';
import { ICookieRepository } from './Interface';

export const cookies: Cookie[] = [];

export class MockCookieRepository implements ICookieRepository {
  async create(cookie: Cookie): Promise<Either<Error, Cookie>> {
    if (cookies.find((c) => c.id === cookie.id)) {
      return new Left(new Error('Cookie already exists'));
    }

    cookies.push(cookie);

    users.find((user) => user.id === cookie.id)?.cookies.push(cookie);

    return new Right(cookie);
  }
}
