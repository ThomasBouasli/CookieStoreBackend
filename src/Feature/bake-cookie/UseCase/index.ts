import jwt from 'jsonwebtoken';
import { IUserRepository, ICookieRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { User } from 'Entity/User';
import { randomUUID } from 'crypto';

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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'no_env'
    ) as User;

    if (!decoded) throw new Error('Invalid token');

    const userOrError = await this.userRepo.findById(decoded.id);

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

    const okOrError = await this.userRepo.update(user);

    if (okOrError.isLeft()) {
      return new Left(okOrError.value);
    }

    cookie = cookieOrError.value;

    return new Right(cookieOrError.value);
  }
}
