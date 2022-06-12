import { InMemoryUserRepository } from "@Adapter/Repository/User/inMemory";
import { LogIn } from ".";
import { CreateUser } from "..";

const userRepo = new InMemoryUserRepository();
const dependency = new CreateUser(userRepo);
const service = new LogIn(userRepo);

it("should be able to log in", async () => {
  await dependency.execute({ name: "John Doe", email: "john@doe.com", password: "123456" });

  const user = await service.execute({
    email: "john@doe.com",
    password: "123456",
  });

  expect(user.isRight()).toBeTruthy();
});
