import jwt from 'jsonwebtoken';
import { IUserRepository } from '@Adapter/Repository';
import { GetAllCookiesFromUser } from '@UseCase/get-all-cookies-from-user';
import { Request, Response, NextFunction } from 'express';
import { User } from 'Entity/User';

export class GetAllCookiesFromUserController {
  constructor(
    userRepo: IUserRepository,
    private service = new GetAllCookiesFromUser(userRepo)
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { user } = request.body;

    const cookiesOrError = await this.service.execute({ userID: user.id });

    if (cookiesOrError.isLeft()) {
      return next(cookiesOrError.value);
    }

    response.json(cookiesOrError.value);
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
