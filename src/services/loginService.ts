import express, { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users";

import { parseParams } from "../@types/register.type";

const router = express.Router();

router.post("/", async (req, res: Response, next: NextFunction) => {
  try {
    const { username, password } = parseParams(req);
    const foundUser: any = await User.findOne({
      where: { username: username },
    });
    if (foundUser === null) {
      throw new Error("User does not exist, do you want to register account?");
    }
    const checkPass = await bcrypt.compare(password, foundUser.password);
    if (!checkPass) {
      throw new Error("Something wrong with username or password");
    }
    const userForToken = {
      username: foundUser.username,
      id: foundUser.id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({ message: "OK", token });
  } catch (error) {
    next(error);
  }
});

export default router;
