import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import companyRoutes from "./routes/companyRoutes";
import User from "./models/users";
import Profile from "./models/profiles";
import Company from "./models/companies";
User.sync();
Profile.sync();
Company.sync();

import middleware from "./utils/middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

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

Profile.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Profile);
Profile.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Profile);
export default app;
