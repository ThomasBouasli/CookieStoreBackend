import jwt from 'jsonwebtoken';
import { MockUserRepository, users } from '@Adapter/Repository';
import { MockCookieRepository } from '@Adapter/Repository/Cookie/Mock';
import { CreateUser } from '@UseCase/create-user';
import { User } from 'Entity/User';
import { BakeCookie } from '.';

describe('bake cookie use case', () => {
  const userRepo = new MockUserRepository();
  const cookieRepo = new MockCookieRepository();
  const createUser = new CreateUser(userRepo);
  const bakeCookie = new BakeCookie(cookieRepo, userRepo);

  let token: string;

  beforeAll(async () => {
    const userOrError = await createUser.execute({
      name: 'Bake Cookie',
      email: 'bake@cookie.com',
      password: 'password'
    });

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    token = userOrError.value;
  });

  it('should create a cookie', async () => {
    const cookie = await bakeCookie.execute({
      token
    });

    if (cookie.isLeft()) {
      throw cookie.value;
    }

    expect(cookie.value).toBeDefined();

    const decoded = jwt.decode(token) as User;

    const userOrError = await userRepo.findById(decoded.id);

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    const user = userOrError.value;

    expect(user.cookies).toContainEqual(cookie.value);
  });
});
