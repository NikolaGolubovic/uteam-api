import { RequestHandler } from "express";
import passport from "passport";

const auth: RequestHandler = (req, _res, next) => {
  passport.authenticate("jwt", { session: false });
  const authorization = req.get("authorization");
  if (!authorization) {
    throw new Error("There is some problem with token");
  }
  req.token = authorization.substring(7);
  next();
};

export default auth;
