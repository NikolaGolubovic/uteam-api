import { Response, NextFunction } from "express";

const auth = (req: any, _res: Response, next: NextFunction) => {
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
