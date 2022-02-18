import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";
import { parseRegisterBody } from "../types/register";
import slugify from "slugify";
import Company from "../models/companies";
import Profile from "../models/profiles";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password: rowPass, email } = parseRegisterBody(req);
    const {
      companyName,
      companyLogo,
      profileName,
      profilePhoto,
      profileStatus,
    } = req.body;
    const foundUser = await User.findOne({
      where: { username: username },
    });
    const foundEmail = await User.findOne({
      where: { email: email },
    });
    if (foundUser !== null) {
      throw new Error("User with that USERNAME is already registred!");
    }
    if (foundEmail !== null) {
      throw new Error("That Email is already used!");
    }
    const saltRound = 10;
    const password = await bcrypt.hash(rowPass, saltRound);
    await User.create({
      username,
      password,
      email,
    });
    const newUserFound = await User.findOne({ where: { username: username } });
    if (newUserFound === null) {
      throw new Error("Something went wrong with new user creation");
    }

    await Company.create({
      name: companyName || `${username}'s Company`,
      logo: companyLogo || `${username}-logo.jpg`,
      slug: companyName
        ? slugify(companyName, { lower: true })
        : `${slugify(username.toLowerCase())}-company`,
      updatedAt: new Date(),
      userId: newUserFound.userId,
    });

    const newCompanyFound = await Company.findOne({
      where: { userId: newUserFound.userId },
    });

    if (newCompanyFound === null) {
      await newUserFound.destroy();
      throw new Error("Something went wrong with new company creation");
    }
    await Profile.create({
      name: profileName,
      profilePhoto,
      userId: newUserFound.userId,
      status: profileStatus,
      companyId: newCompanyFound.companyId,
    });
    const newProfileFound = await Profile.findOne({
      where: {
        userId: newUserFound.userId,
        companyId: newCompanyFound.companyId,
      },
    });
    if (newProfileFound === null) {
      await newUserFound.destroy();
      await newCompanyFound.destroy();
      throw new Error("Something went wrong with new profile creation");
    }
    res.status(200).json({
      user: newUserFound,
      company: newCompanyFound,
      profile: newProfileFound,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    if (!username && !email) {
      throw new Error("Plase provide username or email");
    }
    let foundUser = null;
    if (username) {
      foundUser = await User.findOne({
        where: { username: username },
      });
    }
    if (foundUser === null && email) {
      foundUser = await User.findOne({
        where: { email: email },
      });
    }
    if (foundUser === null) {
      throw new Error("User with provided username or email doesn't exist");
    }
    const userForToken = {
      username: foundUser["username"],
      id: foundUser["id"],
    };
    const token = jwt.sign(userForToken, process.env.SECRET as string);
    res.status(200).send({ message: "OK", token });
  } catch (error) {
    next(error);
  }
};
