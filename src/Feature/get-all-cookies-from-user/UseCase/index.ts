import { IUserRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';

export type GetAllCookiesFromUserRequest = {
  userID: string;
};

export class GetAllCookiesFromUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    userID
  }: GetAllCookiesFromUserRequest): Promise<
    Either<Error, Omit<Cookie, 'owner'>[]>
  > {
    const userOrError = await this.userRepo.findById(userID);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    return new Right(user.cookies);
  }
}
