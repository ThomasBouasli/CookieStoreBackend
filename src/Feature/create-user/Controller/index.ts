import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { IUserRepository } from '@Adapter/Repository';
import { CreateUser } from '@UseCase/create-user';
import { NextFunction, Request, Response } from 'express';

export class CreateUserController {
  private schema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(150)
  });

  constructor(
    userRepo: IUserRepository,
    private service = new CreateUser(userRepo)
  ) {
    this.handle = this.handle.bind(this);
    this.validate = this.validate.bind(this);
  }

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userOrError = await this.service.execute(request.body);
      if (userOrError.isLeft()) throw userOrError.value;

      const user = userOrError.value;

      const token = `Bearer ${jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'no_env'
      )}`;

      response.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public validate(request: Request, response: Response, next: NextFunction) {
    const { error } = this.schema.validate(request.body);
    if (error) {
      response.status(400).json({
        message: error.details[0].message
      });
      return;
    }
    next();
  }
}
