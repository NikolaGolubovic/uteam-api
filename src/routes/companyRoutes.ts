import { Router } from "express";

import {
  getCompanies,
  getSingleCompany,
  createCompany,
  editCompany,
  deleteCompany,
} from "../services/companyService";
import auth from "../utils/authJwtPassport";

const router = Router();

router.get("/", getCompanies);
router.post("/", auth, createCompany);
router.get("/:id", getSingleCompany);
router.put("/:id", auth, editCompany);
router.delete("/:id", auth, deleteCompany);

export default router;
