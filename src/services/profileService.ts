import { RequestHandler } from "express";
import Profile from "../models/profiles";
import User from "../models/users";
import jwt from "jsonwebtoken";
import { MyToken } from "../types/auth";
import { ProfileBody } from "../types/profile";

export const getProfiles: RequestHandler = async (_req, res, next) => {
  try {
    const profiles = await Profile.findAll({ limit: 20 });
    res.status(200).json({ profiles });
  } catch (error) {
    next(error);
  }
};

export const createProfile: RequestHandler = async (req, res, next) => {
  try {
    const { name, profilePhoto, status } = req.body as ProfileBody;
    const { companyId } = req.body;
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
    const newProfile = await Profile.create({
      name,
      profilePhoto,
      userId: foundUser.userId,
      status,
      companyId,
    });
    res.status(201).json({ newProfile });
  } catch (error) {
    next(error);
  }
};

export const getSingleProfile: RequestHandler = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { profileId: +req.params.id },
    });
    if (foundProfile === null) {
      return res.status(404).json({
        error: "Profile is not found",
      });
    }
    res.status(200).json({ foundProfile });
  } catch (error) {
    next(error);
  }
};

export const editProfile: RequestHandler = async (req, res, next) => {
  try {
    const { name, profilePhoto, status } = req.body as ProfileBody;
    const profileId = +req.params.id;
    if (!name || !profilePhoto) {
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
    const foundProfile = await Profile.findOne({ where: { profileId } });
    if (foundProfile === null) {
      return res.status(401).json({
        error: "Something went wrong with a token, user does not exist",
      });
    }
    if (foundUser.userId !== foundProfile.userId) {
      return res.status(401).json({
        error: "You are not authorized to change other's profiles",
      });
    }
    foundProfile.set({
      name,
      profilePhoto,
      status,
    });
    await foundProfile.save();
    res.status(200).json({ msg: "Resource updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile: RequestHandler = async (req, res, next) => {
  try {
    const profileId = req.params.id;
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
    const foundProfile = await Profile.findOne({ where: { profileId } });
    if (foundUser.userId !== foundProfile.userId) {
      return res.status(401).json({
        error: "You are not authorized to change other's profiles",
      });
    }
    await foundProfile.destroy();
    res.status(200).json({ msg: "Profile is successfuly deleted!" });
  } catch (error) {
    next(error);
  }
};
