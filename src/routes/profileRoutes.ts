import { Router } from "express";

import {
  getProfiles,
  createProfile,
  editProfile,
  getSingleProfile,
  deleteProfile,
} from "../services/profileService";
import auth from "../utils/authJwtPassport";

const router = Router();

router.get("/", getProfiles);
router.post("/", auth, createProfile);
router.get("/:id", getSingleProfile);
router.put("/:id", auth, editProfile);
router.delete("/:id", auth, deleteProfile);

export default router;
