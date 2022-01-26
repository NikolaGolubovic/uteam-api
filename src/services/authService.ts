import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";
import { parseRegisterBody } from "../types/register";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password: rowPass, email } = parseRegisterBody(req);
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
    const newUser = await User.create({
      username,
      password,
      email,
    });
    res.status(200).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
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
    const checkPass = await bcrypt.compare(password, foundUser["password"]);
    if (!checkPass) {
      throw new Error(
        "Can't found USER with provided username or password, please check your inputs."
      );
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
