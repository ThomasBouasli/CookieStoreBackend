import { IUserRepository } from "@Adapter/Repository";
import { User } from "@Domain/Entity";
import { Either, Left, Right } from "@Util/FunctionalErrorHandler";
import { randomUUID } from "crypto";

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};
export class CreateUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({ name, email, password } : CreateUserRequest): Promise<Either<Error, User>> {

    const user : User = {
      id: randomUUID(),
      name,
      email,
      password
    }
    const userExists = await this.userRepo.findByEmail(user.email);
    if (userExists) {
      return new Left(new Error("User already exists"));
    }
    const okOrError = await this.userRepo.create(user);

    if (okOrError.isLeft()) {
      return new Left(okOrError.value);
    }

    return new Right(okOrError.value);
  }
}
