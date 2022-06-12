import { CreateUserController } from "@Controller/create-user";
import { IUserRepository } from "@Adapter/Repository";
import { Router } from "express";
import { LogInController } from "@Controller/log-in";
const router = Router();

export function userRouter(userRepo: IUserRepository) {
  router.route("/register").post(new CreateUserController(userRepo).validate, new CreateUserController(userRepo).handle);
  router.route("/login").post(new LogInController(userRepo).validate, new LogInController(userRepo).handle);
  return router;
}
