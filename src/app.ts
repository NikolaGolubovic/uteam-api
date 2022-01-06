import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import usersRouter from "./services/userService";
import middleware from "./utils/middleware";
import User from "./models/users";
User.sync();
const app = express();
interface startingMsg {
  msg: string;
}

app.use("/api/users", usersRouter);

app.get("*", (_req: Request, res: Response) => {
  const helloObj: startingMsg = {
    msg: "Hello world",
  };
  res.status(200).json(helloObj);
});

app.use(middleware.errorHandler);

export default app;
