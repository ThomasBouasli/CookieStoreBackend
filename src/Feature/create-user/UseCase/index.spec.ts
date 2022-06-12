import { MockUserRepository } from '@Adapter/Repository/User/Mock';
import { CreateUser } from '.';

const userRepo = new MockUserRepository();
const service = new CreateUser(userRepo);

it('should create a new user', async () => {
  const user = await service.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456'
  });
  expect(user.isRight()).toBeTruthy();
  expect(user.value.name).toBe('John Doe');
});
