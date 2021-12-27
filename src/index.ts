import app from "./app";
import { database } from "./utils/database";

const PORT = process.env.PORT || 5000;

(async () => {
  await database.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  });
})();
