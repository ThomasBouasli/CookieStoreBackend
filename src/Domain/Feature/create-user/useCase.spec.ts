import { InMemoryUserRepository } from "@Adapter/Repository/User/inMemory";
import { CreateUser } from "./useCase";

const userRepo = new InMemoryUserRepository();
const service = new CreateUser(userRepo);

it("should create a new user", async () => {
  const user = await service.execute({ name: "John Doe", email: "john@doe.com", password: "123456" });
  expect(user.isRight()).toBeTruthy();
  expect(user.value.name).toBe("John Doe");
});