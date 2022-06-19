import jwt from 'jsonwebtoken';
import { IUserRepository } from '@Adapter/Repository';
import { LogIn, LogInRequest } from '@UseCase/log-in';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export class LogInController {
  private schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(150)
  });

  constructor(
    userRepo: IUserRepository,
    private service = new LogIn(userRepo)
  ) {
    this.handle = this.handle.bind(this);
    this.validate = this.validate.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const data: LogInRequest = request.body;

    const userOrError = await this.service.execute(data);

    if (userOrError.isLeft()) {
      return next(userOrError.value);
    }

    const user = userOrError.value;

    const token = `Bearer ${jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'no_env'
    )}`;

    response.status(200).json({ token });
  }

  async validate(request: Request, response: Response, next: NextFunction) {
    const data: LogInRequest = request.body;

    const { error } = this.schema.validate(data);

    if (error) {
      return response.status(400).json({
        message: error.details[0].message
      });
    }
    next();
  }
}
