import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  token: string;
}

export interface MyToken {
  username: string;
}
