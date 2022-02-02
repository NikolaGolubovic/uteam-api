import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  ExtractJwt as ExtractJWT,
  Strategy as JWTStrategy,
} from "passport-jwt";
import User from "../models/users";
import { RequestHandler } from "express";

export const passportInit: RequestHandler = (_req, _res, next) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, _password, done) => {
        const user = await User.findOne({
          where: { username: username.toLowerCase() },
        });
        if (!user) {
          return done(undefined, false, {
            message: `Username ${username} not found.`,
          });
        }
        if (user) {
          done(undefined, user);
        }
      }
    )
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
      },
      async function (jwtPayload, cb) {
        try {
          const user = await User.findOne({
            where: { username: jwtPayload.username },
          });
          if (!user) {
            return cb(null, false);
          }
          return cb(null, user);
        } catch (error) {
          cb(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });
  next();
};
