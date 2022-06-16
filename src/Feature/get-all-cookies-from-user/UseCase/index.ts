import jwt from 'jsonwebtoken';
import { IUserRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { User } from 'Entity/User';

export type GetAllCookiesFromUserRequest = {
  token: string;
};

export class GetAllCookiesFromUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    token
  }: GetAllCookiesFromUserRequest): Promise<
    Either<Error, Omit<Cookie, 'owner'>[]>
  > {
    const decoded = jwt.decode(token) as User;

    const userOrError = await this.userRepo.findById(decoded.id);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    return new Right(user.cookies);
  }
}
