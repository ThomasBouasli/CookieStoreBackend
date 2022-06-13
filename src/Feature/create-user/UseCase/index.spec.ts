import jwt from 'jsonwebtoken';
import { MockUserRepository } from '@Adapter/Repository/User/Mock';
import { CreateUser } from '.';
import { User } from 'Entity/User';

const userRepo = new MockUserRepository();
const service = new CreateUser(userRepo);

it('should create a new user', async () => {
  const tokenOrError = await service.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456'
  });

  expect(tokenOrError.isRight()).toBeTruthy();

  if (tokenOrError.isLeft()) {
    throw tokenOrError.value;
  }

  const decoded = jwt.verify(
    tokenOrError.value,
    process.env.JWT_SECRET ?? 'no_env'
  ) as User;

  expect(decoded.name).toBe('John Doe');
});
