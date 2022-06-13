import jwt from 'jsonwebtoken';
import { MockUserRepository } from '@Adapter/Repository';
import { MockCookieRepository } from '@Adapter/Repository/Cookie/Mock';
import { CreateUser } from '@UseCase/create-user';
import { User } from 'Entity/User';
import { BakeCookie } from '.';

describe('bake cookie use case', () => {
  const userRepo = new MockUserRepository();
  const cookieRepo = new MockCookieRepository();
  const createUser = new CreateUser(userRepo);
  const bakeCookie = new BakeCookie(cookieRepo, userRepo);

  let user: User;

  beforeAll(async () => {
    const userOrError = await createUser.execute({
      name: 'Bake Cookie',
      email: 'bake@cookie.com',
      password: 'password'
    });

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    const token = userOrError.value;

    user = jwt.verify(token, process.env.JWT_SECRET ?? 'no_env') as User;
  });

  it('should create a cookie', async () => {
    const cookie = await bakeCookie.execute({
      userId: user.id
    });

    if (cookie.isLeft()) {
      throw cookie.value;
    }

    expect(cookie.value).toBeDefined();

    const userOrError = await userRepo.findById(user.id);

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    expect(userOrError.value.Cookies.length).toBe(1);
  });
});
