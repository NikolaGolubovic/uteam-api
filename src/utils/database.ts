import { Sequelize } from "sequelize";
let sequelize: Sequelize;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    process.env.DB_TEST_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
}

export default sequelize;
