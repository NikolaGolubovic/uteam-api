import express, { Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import User from "../models/users";
import { parseParams } from "../@types/register.type";
const router = express.Router();

router.post("/", async (req, res: Response, next: NextFunction) => {
  try {
    const { username, password: rowPass, email } = parseParams(req);
    const foundUser = await User.findOne({ where: { username: username } });
    if (foundUser !== null) {
      throw new Error("User with that USERNAME is already registred!");
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
});

export default router;
