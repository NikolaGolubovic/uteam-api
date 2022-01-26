import { RequestHandler } from "express";

const auth: RequestHandler = (req, _res, next) => {
  const authorization = req.get("authorization");
  if (!authorization) {
    throw new Error("There is some problem with token");
  }
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  return next();
};

export default auth;
