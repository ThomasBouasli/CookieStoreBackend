import Express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './Routes';
import { MockUserRepository } from '@Adapter/Repository/User';
import { MockCookieRepository } from '@Adapter/Repository';
import path from 'path';

const app = Express();
const userRepo = new MockUserRepository();
const cookieRepo = new MockCookieRepository(userRepo);

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}
app.use(Express.json());
app.use('/', Express.static(path.join(__dirname, '../../Adapter/view/build')));
app.use('/api', userRouter(userRepo, cookieRepo));
app.get('*', (req, res) => {
  //Let React Router handle all other routes
  res.sendFile(
    path.resolve(__dirname, '../../Adapter/view/build', 'index.html')
  );
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //Temporary Error Handler
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT ?? 0;

export const server = app.listen(PORT, () => {
  PORT === process.env.PORT && console.log(`Server listening on port ${PORT}`);
});
