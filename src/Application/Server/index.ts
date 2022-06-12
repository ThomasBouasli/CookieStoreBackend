import Express, { Request, Response } from "express";
import { userRouter } from "./Routes";
import { InMemoryUserRepository } from "@Adapter/Repository/User";

const app = Express();
const userRepo = new InMemoryUserRepository();

app.use(Express.json());
app.use("/api", userRouter(userRepo));
app.use((err: Error, req: Request, res: Response) => {
  //Temporary Error Handler
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT ?? 0;

export const server = app.listen(PORT, () => {
  PORT === process.env.PORT ?? console.log(`Server listening on port ${PORT}`);
});
