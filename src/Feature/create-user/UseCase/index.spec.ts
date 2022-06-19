import { MockUserRepository } from '@Adapter/Repository/User/Mock';
import { CreateUser } from '.';

const userRepo = new MockUserRepository();
const service = new CreateUser(userRepo);

it('should create a new user', async () => {
  const userOrError = await service.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456'
  });

  expect(userOrError.isRight()).toBeTruthy();

  if (userOrError.isLeft()) {
    throw userOrError.value;
  }

  const user = userOrError.value;

  expect(user.name).toBe('John Doe');
});
