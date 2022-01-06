import express, { Response, NextFunction } from "express";
const router = express.Router();

router.post("/", async (req, res: Response, next: NextFunction) => {
  try {
    res.send("hello world");
  } catch (error) {
    next(error);
  }
});

export default router;
