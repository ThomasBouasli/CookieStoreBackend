import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '@Adapter/Repository';
import { VerifyToken } from '@UseCase/verify-token';
import { User } from 'Entity/User';

export class VerifyTokenController {
  constructor(
    userRepo: IUserRepository,
    private service = new VerifyToken(userRepo)
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    jwt.verify(
      request.headers.authorization?.split(' ')[1] as string,
      process.env.JWT_SECRET || 'no_env',
      async (err, decoded) => {
        if (err) {
          return response.json({
            isValid: err ? false : true
          });
        }

        const userExists = await this.service.execute({
          user: decoded as User
        });

        response.json({
          isValid: userExists.isLeft() ? false : true
        });
      }
    );
  }
}
