import { Request, Response, NextFunction } from 'express';
import { ICookieRepository, IUserRepository } from '@Adapter/Repository';
import { BakeCookie } from '@UseCase/bake-cookie';

export class BakeCookieController {
  constructor(
    userRepo: IUserRepository,
    cookieRepo: ICookieRepository,
    private service = new BakeCookie(cookieRepo, userRepo)
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1] as string;

    const cookieOrError = await this.service.execute({ token });

    if (cookieOrError.isLeft()) {
      return next(cookieOrError.value);
    }

    response.json(cookieOrError.value);
  }
}
