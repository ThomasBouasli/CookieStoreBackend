import { IUserRepository, ICookieRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { randomUUID } from 'crypto';

export type BakeCookieRequest = {
  userID: string;
};

export class BakeCookie {
  constructor(
    private cookieRepo: ICookieRepository,
    private userRepo: IUserRepository
  ) {}

  async execute({ userID }: BakeCookieRequest): Promise<Either<Error, Cookie>> {
    const userOrError = await this.userRepo.findById(userID);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    let cookie: Cookie = {
      id: randomUUID(),
      name: Math.random().toString(),
      owner: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    const cookieOrError = await this.cookieRepo.create(cookie);

    if (cookieOrError.isLeft()) {
      return new Left(cookieOrError.value);
    }

    cookie = cookieOrError.value;

    return new Right(cookieOrError.value);
  }
}
