import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  token: string; // or any other type
}

export interface MyToken {
  username: string;
}
