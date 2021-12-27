import { Sequelize } from "sequelize";
import { InitUser } from "../models/users";
import dotenv from "dotenv";
dotenv.config();

// import config from "../config/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

export const database = {
  sequelize,
  User: InitUser(sequelize),
};
