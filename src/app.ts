import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import usersRouter from "./services/userService";
import loginRouter from "./services/loginService";
import middleware from "./utils/middleware";
import User from "./models/users";
User.sync();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

interface startingMsg {
  msg: string;
}

app.use("/api/register", usersRouter);
app.use("/api/login", loginRouter);

app.get("*", (_req: Request, res: Response) => {
  const helloObj: startingMsg = {
    msg: "Hello world",
  };
  res.status(200).json(helloObj);
});

app.use(middleware.errorHandler);

export default app;
