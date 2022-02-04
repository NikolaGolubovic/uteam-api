import express, { Request, Response } from "express";
import cors from "cors";
// import session from "express-session";

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import companyRoutes from "./routes/companyRoutes";

import middleware from "./utils/middleware";
import { passportInit } from "./utils/passport";
import { baseSync } from "./utils/baseSync";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use(baseSync);

// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SECRET,
//   })
// );
app.use(passportInit);

interface startingMsg {
  msg: string;
}

app.use("/profiles", profileRoutes);
app.use("/companies", companyRoutes);
app.use(authRoutes);

app.get("*", (_req: Request, res: Response) => {
  const helloObj: startingMsg = {
    msg: "Hello world",
  };
  res.status(200).json(helloObj);
});

app.use(middleware.errorHandler);
export default app;
