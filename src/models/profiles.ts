import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class Profile extends Model {
  public profileId!: number;
  public name!: string;
  public status!: "pending" | "published";
  public profilePhoto!: "string";
  public userId!: number;
}

Profile.init(
  {
    profileId: {
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
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "profiles",
    sequelize,
  }
);

export default Profile;
