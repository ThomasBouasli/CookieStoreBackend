import { MockUserRepository } from '@Adapter/Repository';
import { MockCookieRepository } from '@Adapter/Repository';
import { BakeCookie } from '@UseCase/bake-cookie';
import { CreateUser } from '@UseCase/create-user';
import { User } from 'Entity/User';
import { GetAllCookiesFromUser } from '.';

const userRepo = new MockUserRepository();
const cookieRepo = new MockCookieRepository(userRepo);
const service = new GetAllCookiesFromUser(userRepo);
const dependency = new CreateUser(userRepo);
const secondDependency = new BakeCookie(cookieRepo, userRepo);

let user: User;

beforeAll(async () => {
  const userOrError = await dependency.execute({
    name: 'Bake Cookie',
    email: 'bake@cookie.com',
    password: 'password'
  });

  if (userOrError.isLeft()) {
    throw userOrError.value;
  }

  user = userOrError.value;

  const cookieOrError = await secondDependency.execute({
    userID: user.id
  });

  if (cookieOrError.isLeft()) {
    throw cookieOrError.value;
  }
});

it('should get all cookies from user', async () => {
  const cookiesOrError = await service.execute({
    userID: user.id
  });

  if (cookiesOrError.isLeft()) {
    throw cookiesOrError.value;
  }

  expect(cookiesOrError.value).toBeDefined();
});
