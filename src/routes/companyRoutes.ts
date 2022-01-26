import { Router } from "express";

import {
  getCompanies,
  getSingleCompany,
  createCompany,
  editCompany,
  deleteCompany,
} from "../services/companyService";

const router = Router();

router.get("/", getCompanies);
router.post("/", createCompany);
router.get("/:id", getSingleCompany);
router.put("/:id", editCompany);
router.delete("/:id", deleteCompany);

export default router;
