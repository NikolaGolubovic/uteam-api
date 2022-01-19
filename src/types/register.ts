export interface registerValues {
  username: string;
  password: string;
  email: string;
}

import { validateEmail, validateUsername } from "../utils/helpers";
import { Request } from "express";

export function parseRegisterBody(req: Request): registerValues {
  const { username, password, email } = req.body;
  if (
    !username ||
    typeof username !== "string" ||
    !validateUsername(username)
  ) {
    throw new Error(
      "Please provide valid username which starts with a letter."
    );
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    throw new Error("Password needs to contain at least 6 characters.");
  }
  if (email && !validateEmail(email)) {
    throw new Error("Please check your email");
  }
  return {
    username,
    password,
    email,
  };
}
