import { RequestHandler } from "express";
import Company from "../models/companies";
import { CompanyBody } from "../types/company";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { MyToken } from "../types/auth";
import User from "../models/users";

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
    const decodedToken = jwt.verify(req.token, process.env.SECRET) as MyToken;
    if (!decodedToken.username) {
      return res.status(401).json({
        error: "token missing or invalid",
      });
    }
    const foundUser = await User.findOne({
      where: { username: decodedToken.username },
    });
    if (foundUser === null) {
      return res.status(401).json({
        error: "User with infos from token does not exist",
      });
    }
    const newCompany = await Company.create({
      name,
      logo,
      slug: slugify(name, { lower: true }),
      updatedAt: new Date(),
      userId: foundUser.userId,
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
    if (!name || !logo) {
      return res.status(401).json({
        error: "Please Provide all values",
      });
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET) as MyToken;
    if (!decodedToken.username) {
      return res.status(401).json({
        error: "token missing or invalid",
      });
    }
    const foundUser = await User.findOne({
      where: { username: decodedToken.username },
    });
    console.log("foundCompany", companyId);
    const foundCompany = await Company.findOne({
      where: { companyId: companyId },
    });
    if (foundCompany === null) {
      return res.status(401).json({
        error: "Id from params is not ok, user does not exist",
      });
    }

    if (foundUser.userId !== foundCompany.userId) {
      return res.status(401).json({
        error: "You are not authorized to change other's profiles",
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
    const decodedToken = jwt.verify(
      req.token,
      process.env.SECRET as string
    ) as MyToken;
    if (!decodedToken.username) {
      return res.status(401).json({
        error: "token missing or invalid",
      });
    }
    const foundUser = await User.findOne({
      where: { username: decodedToken.username },
    });
    const foundCompany = await Company.findOne({ where: { companyId } });
    if (foundUser.userId !== foundCompany.userId) {
      return res.status(401).json({
        error: "You are not authorized to change other's profiles",
      });
    }
    await foundCompany.destroy();
    res.status(200).json({ msg: "Company is successfuly deleted!" });
  } catch (error) {
    next(error);
  }
};
