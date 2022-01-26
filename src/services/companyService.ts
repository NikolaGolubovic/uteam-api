import { RequestHandler } from "express";
import Company from "../models/companies";
import { CompanyBody } from "../types/company";
import slugify from "slugify";

export const getCompanies: RequestHandler = async (_req, res, next) => {
  try {
    const companies = await Company.findAll({ limit: 20 });
    res.status(200).json({ companies });
  } catch (error) {
    next(error);
  }
};

export const createCompany: RequestHandler = async (req, res, next) => {
  try {
    const { name, logo } = req.body as CompanyBody;
    const newCompany = await Company.create({
      name,
      logo,
      slug: slugify(name, { lower: true }),
      updatedAt: new Date(),
    });
    res.status(201).json({ newCompany });
  } catch (error) {
    next(error);
  }
};

export const getSingleCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const foundCompany = await Company.findOne({ where: { companyId } });
    if (foundCompany === null) {
      return res.status(404).json({
        error: "Profile is not found",
      });
    }
    res.status(200).json({ foundCompany });
  } catch (error) {
    next(error);
  }
};

export const editCompany: RequestHandler = async (req, res, next) => {
  try {
    const { name, logo } = req.body as CompanyBody;
    const companyId = req.params.id;
    const foundCompany = await Company.findOne({ where: { companyId } });
    if (foundCompany === null) {
      return res.status(401).json({
        error: "Id from params is not ok, user does not exist",
      });
    }
    foundCompany.set({
      name,
      logo,
      slug: slugify(name, { lower: true }),
      updatedAt: new Date(),
    });
    await foundCompany.save();
    res.status(200).json({ msg: "Company Info updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const foundCompany = await Company.findOne({ where: { companyId } });
    await foundCompany.destroy();
    res.status(200).json({ msg: "Company is successfuly deleted!" });
  } catch (error) {
    next(error);
  }
};
