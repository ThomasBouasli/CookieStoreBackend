import { MockUserRepository } from '@Adapter/Repository';
import { MockCookieRepository } from '@Adapter/Repository';
import { BakeCookie } from '@UseCase/bake-cookie';
import { CreateUser } from '@UseCase/create-user';
import { GetAllCookiesFromUser } from '.';

const userRepo = new MockUserRepository();
const cookieRepo = new MockCookieRepository(userRepo);
const service = new GetAllCookiesFromUser(userRepo);
const dependency = new CreateUser(userRepo);
const secondDependency = new BakeCookie(cookieRepo, userRepo);

let token: string;

beforeAll(async () => {
  const userOrError = await dependency.execute({
    name: 'Bake Cookie',
    email: 'bake@cookie.com',
    password: 'password'
  });

  if (userOrError.isLeft()) {
    throw userOrError.value;
  }

  token = userOrError.value;

  const cookieOrError = await secondDependency.execute({
    token
  });

  if (cookieOrError.isLeft()) {
    throw cookieOrError.value;
  }
});

it('should get all cookies from user', async () => {
  const cookiesOrError = await service.execute({
    token
  });

  if (cookiesOrError.isLeft()) {
    throw cookiesOrError.value;
  }

  expect(cookiesOrError.value).toBeDefined();
});
