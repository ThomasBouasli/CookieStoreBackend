import jwt from 'jsonwebtoken';
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
    this.validate = this.validate.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1] as string;

    const cookieOrError = await this.service.execute({ token });

    if (cookieOrError.isLeft()) {
      return next(cookieOrError.value);
    }

    response.json(cookieOrError.value);
  }

  async validate(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({
        error: 'No token provided'
      });
    }

    const bearer = token.split(' ')[0];

    if (bearer !== 'Bearer') {
      return response.status(401).json({
        error: 'Invalid token'
      });
    }

    jwt.verify(
      token.split(' ')[1],
      process.env.JWT_SECRET ?? 'no_env',
      (err, decoded) => {
        if (err) {
          return response.status(401).json({
            error: 'Invalid token'
          });
        }
        next();
      }
    );
  }
}
