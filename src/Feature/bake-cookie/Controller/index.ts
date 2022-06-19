import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ICookieRepository, IUserRepository } from '@Adapter/Repository';
import { BakeCookie } from '@UseCase/bake-cookie';
import { User } from 'Entity/User';

export class BakeCookieController {
  constructor(
    userRepo: IUserRepository,
    cookieRepo: ICookieRepository,
    private service = new BakeCookie(cookieRepo, userRepo)
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { user } = request.body;

    const cookieOrError = await this.service.execute({ userID: user.id });

    if (cookieOrError.isLeft()) {
      return next(cookieOrError.value);
    }

    response.json(cookieOrError.value);
  }

  async validate(request: Request, response: Response, next: NextFunction) {
    const bearer = request.headers.authorization?.split(' ')[0] as string;
    const token = request.headers.authorization?.split(' ')[1] as string;

    if (bearer !== 'Bearer' || !token) {
      return response.status(401).json({
        message: 'Invalid token'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'no_env', (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: 'Invalid token'
        });
      }

      request.body.user = decoded as User;

      next();
    });
  }
}
