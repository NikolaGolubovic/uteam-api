import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class Company extends Model {
  declare name: string;
  declare logo: string;
  declare slug: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Company.init(
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
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "company",
    sequelize,
    underscored: true,
  }
);

export default Company;
