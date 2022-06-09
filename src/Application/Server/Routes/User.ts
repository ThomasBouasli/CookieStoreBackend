import { CreateUserController, CreateUserValidation } from "@Adapter/Controller";
import { IUserRepository } from "@Adapter/Repository";
import { Router } from "express";
const router = Router();

export function userRouter(userRepo: IUserRepository) {
  router.route("/user").post(new CreateUserValidation().handle, new CreateUserController(userRepo).handle);

  return router;
}