import { CreateUserController } from "@Controller/create-user";
import { IUserRepository } from "@Adapter/Repository";
import { Router } from "express";
const router = Router();

export function userRouter(userRepo: IUserRepository) {
  router.route("/user").post(new CreateUserController(userRepo).validate, new CreateUserController(userRepo).handle);

  return router;
}
