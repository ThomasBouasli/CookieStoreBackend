import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export class VerifyTokenController {
  async handle(request: Request, response: Response, next: NextFunction) {
    jwt.verify(
      request.headers.authorization?.split(' ')[1] as string,
      process.env.JWT_SECRET || 'no_env',
      (err, decoded) => {
        response.json({
          isValid: err ? false : true
        });
      }
    );
  }
}
