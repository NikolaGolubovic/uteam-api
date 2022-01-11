import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Profile: any = sequelize.define("Profile", {
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
});

export default Profile;
