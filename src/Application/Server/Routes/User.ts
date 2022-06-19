import { CreateUserController } from '@Controller/create-user';
import { ICookieRepository, IUserRepository } from '@Adapter/Repository';
import { Router } from 'express';
import { LogInController } from '@Controller/log-in';
import { BakeCookieController } from '@Controller/bake-cookie';
import { GetAllCookiesFromUserController } from '@Controller/get-all-cookies-from-user';
const router = Router();

export function userRouter(
  userRepo: IUserRepository,
  cookieRepo: ICookieRepository
) {
  router
    .route('/register')
    .post(
      new CreateUserController(userRepo).validate,
      new CreateUserController(userRepo).handle
    );
  router
    .route('/login')
    .post(
      new LogInController(userRepo).validate,
      new LogInController(userRepo).handle
    );
  router
    .route('/bake')
    .post(
      new BakeCookieController(userRepo, cookieRepo).validate,
      new BakeCookieController(userRepo, cookieRepo).handle
    );
  router.get(
    '/cookies',
    new GetAllCookiesFromUserController(userRepo).validate,
    new GetAllCookiesFromUserController(userRepo).handle
  );
  return router;
}
