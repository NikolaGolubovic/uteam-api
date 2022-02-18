import { DataTypes, Model } from "sequelize";
import { Role } from "../types/models";
import sequelize from "../utils/database";

class User extends Model {
  declare userId: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: Role;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("company-user", "company-admin", "superadmin"),
      defaultValue: "company-user",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    sequelize,
  }
);

export default User;
