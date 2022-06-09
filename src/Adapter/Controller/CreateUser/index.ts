import { IUserRepository } from "@Adapter/Repository";
import { CreateUser } from "@Domain/UseCase";
import { NextFunction, Request, Response } from "express";

export class CreateUserController {
  private service: CreateUser;

  constructor(userRepo: IUserRepository) {
    this.service = new CreateUser(userRepo);
    this.handle = this.handle.bind(this);
  }

  public async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const userOrError = await this.service.execute(request.body);
      if (userOrError.isLeft()) throw userOrError.value;

      response.status(201).json(userOrError.value);
    } catch (error) {
      next(error);
    }
  }
}

export * from './Middleware';