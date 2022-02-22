import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  ExtractJwt as ExtractJWT,
  Strategy as JWTStrategy,
} from "passport-jwt";
import User from "../models/users";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { Op } from "sequelize";

export const passportInit: RequestHandler = (req, res, next) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username = "default", password, done) => {
        const email = (req.body.email as string) || "default";
        const user = await User.findOne({
          where: {
            [Op.or]: [{ username: username }, { email: email }],
          },
        });
        if (!user) {
          return done(undefined, false, {
            message: `Person with that credentials is not found.`,
          });
        }
        bcrypt.compare(password, user.password, (err, data) => {
          if (err) {
            return done(err);
          }
          if (data) {
            done(undefined, user);
          }
          if (!data) {
            res.json({ success: false, message: "passwords do not match" });
          }
        });
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

  passport.deserializeUser(function (user: User, done) {
    done(null, user);
  });
  next();
};
