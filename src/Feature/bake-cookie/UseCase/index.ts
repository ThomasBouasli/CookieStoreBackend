import jwt from 'jsonwebtoken';
import { IUserRepository, ICookieRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { User } from 'Entity/User';

export type CreateCookieRequest = {
  token: string;
};

export class BakeCookie {
  constructor(
    private cookieRepo: ICookieRepository,
    private userRepo: IUserRepository
  ) {}

  async execute({
    token
  }: CreateCookieRequest): Promise<Either<Error, Cookie>> {
    const decoded = jwt.decode(token) as User;

    if (!decoded) throw new Error('Invalid token');

    const userOrError = await this.userRepo.findById(decoded.id);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    const cookie: Cookie = {
      id: user.id,
      name: Math.random().toString(),
      owner: user
    };

    const cookieOrError = await this.cookieRepo.create(cookie);

    if (cookieOrError.isLeft()) {
      return new Left(cookieOrError.value);
    }

    return new Right(cookieOrError.value);
  }
}
