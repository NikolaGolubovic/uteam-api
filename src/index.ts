import app from "./app";
import { database } from "./utils/database";

(async () => {
  await database.sequelize.sync({ alter: true }).then(() => {
    app.listen(5000, () => {
      console.log(`Server is running on port:5000`);
    });
  });
})();
