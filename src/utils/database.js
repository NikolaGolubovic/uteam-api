import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("sequelize_tut", "root", "misterija", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
