import { Router } from "express";
import passport from "passport";

import { registerUser, loginUser } from "../services/authService";

const router = Router();

router.post("/register", registerUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);

export default router;
