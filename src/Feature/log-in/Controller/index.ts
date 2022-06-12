import { IUserRepository } from "@Adapter/Repository";
import { LogIn, LogInRequest } from "@UseCase/log-in";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class LogInController {
  private schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(150),
  });

  constructor(userRepo: IUserRepository, private service = new LogIn(userRepo)) {
    this.handle = this.handle.bind(this);
    this.validate = this.validate.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const data: LogInRequest = request.body;

    const okOrError = await this.service.execute(data);

    if (okOrError.isLeft()) {
      return next(okOrError.value);
    }

    response.status(200).json(okOrError.value);
  }

  async validate(request: Request, response: Response, next: NextFunction) {
    const data: LogInRequest = request.body;

    const { error } = this.schema.validate(data);

    if (error) {
      return response.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  }
}
