import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class CreateUserValidation {
  private schema = Joi.object({
    name: Joi.string().required().min(3).max(150),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(150),
  });

  constructor() {
    this.handle = this.handle.bind(this);
  }

  public handle(request: Request, response: Response, next: NextFunction) {
    const { error } = this.schema.validate(request.body);
    if (error) {
      response.status(400).json({
        message: error.details[0].message,
      });
      return;
    }
    next();
  }
}
