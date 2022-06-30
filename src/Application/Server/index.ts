import Express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './Routes';
import { MockCookieRepository, MockUserRepository, PrismaCookieRepository, PrismaUserRepository } from '@Adapter/Repository';

const { NODE_ENV, PORT } = process.env;
const app = Express();

// Setup Database

const userRepo = NODE_ENV === 'test' ? new MockUserRepository() : new PrismaUserRepository();
const cookieRepo = NODE_ENV === 'test' ? new MockCookieRepository(userRepo) : new PrismaCookieRepository();

// Middlewares

app.use(cors());
app.use(Express.json());

// Register Routes

app.use('/api', userRouter(userRepo, cookieRepo));

// Temporary Error Handler

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

// Listen

export const server = app.listen(PORT, () => {
  PORT !== '0' && console.log(`Server listening on port ${PORT}`);
});
