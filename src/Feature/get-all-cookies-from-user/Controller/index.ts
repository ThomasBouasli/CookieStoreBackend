import { IUserRepository } from '@Adapter/Repository';
import { GetAllCookiesFromUser } from '@UseCase/get-all-cookies-from-user';
import { Request, Response, NextFunction } from 'express';

export class GetAllCookiesFromUserController {
  constructor(
    userRepo: IUserRepository,
    private service = new GetAllCookiesFromUser(userRepo)
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new Error('No token provided'));
    }

    const cookiesOrError = await this.service.execute({ token });

    if (cookiesOrError.isLeft()) {
      return next(cookiesOrError.value);
    }

    response.json(cookiesOrError.value);
  }
}
