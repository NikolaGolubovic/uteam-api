import User from "../models/users";
import Profile from "../models/profiles";
import Company from "../models/companies";

export const baseSync = () => {
  Profile.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Profile, { foreignKey: "userId" });
  Company.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Company, { foreignKey: "userId" });
  Profile.belongsTo(Company, { foreignKey: "companyId" });
  Company.hasMany(Profile, { foreignKey: "companyId" });
};
