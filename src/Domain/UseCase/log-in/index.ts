import jwt from "jsonwebtoken";
import { IUserRepository } from "@Adapter/Repository";
import { Either, Left, Right } from "@Util/FunctionalErrorHandler";
import { compareSync } from "bcrypt";

export type LogInRequest = {
  email: string;
  password: string;
};

export class LogIn {
  constructor(private userRepo: IUserRepository) {}

  async execute({ email, password }: LogInRequest): Promise<Either<Error, string>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return new Left(new Error("User not found"));
    }
    if (!compareSync(password, user.password)) {
      return new Left(new Error("Wrong password"));
    }
    return new Right(jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "no_env"));
  }
}
