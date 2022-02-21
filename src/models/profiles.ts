import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class Profile extends Model {
  declare profileId: number;
  declare name: string;
  declare status: "pending" | "published";
  declare profilePhoto: "string";
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "published"),
      defaultValue: "pending",
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "profile",
    underscored: true,
  }
);

export default Profile;
