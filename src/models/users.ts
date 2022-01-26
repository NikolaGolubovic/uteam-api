import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class User extends Model {
  public userId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "company-user" | "company-admin" | "superadmin";
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
    tableName: "users",
    sequelize,
  }
);
export default User;
