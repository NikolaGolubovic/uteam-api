import app from "./app";
import sequelize from "./utils/database";

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("SERVER IS UP");
    app.listen(PORT);
  })
  .catch((err: Error) => console.log(err));
