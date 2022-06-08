import { IUserRepository } from "@Adapter/Repository";
import { User } from "@Domain/Entity";
import { Either, Left, Right } from "@Util/FunctionalErrorHandler";

export class CreateUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(user: User): Promise<Either<Error, User>> {
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
