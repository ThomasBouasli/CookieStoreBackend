import Express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './Routes';
import { MockUserRepository } from '@Adapter/Repository/User';
import { MockCookieRepository } from '@Adapter/Repository';

const app = Express();
const userRepo = new MockUserRepository();
const cookieRepo = new MockCookieRepository(userRepo);

app.use(Express.json());
app.use('/api', userRouter(userRepo, cookieRepo));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //Temporary Error Handler
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT ?? 0;

export const server = app.listen(PORT, () => {
  PORT === process.env.PORT && console.log(`Server listening on port ${PORT}`);
});
