import express, { Request, Response } from "express";

const app = express();

interface startingMsg {
  msg: string;
}

app.get("*", (_req: Request, res: Response) => {
  const helloObj: startingMsg = {
    msg: "Hello world",
  };
  res.status(200).json(helloObj);
});

export default app;
