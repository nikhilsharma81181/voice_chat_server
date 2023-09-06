import express, { Request, Response, NextFunction } from "express";
import HomePage from "../models/home_model";

const readHomePageData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const homePageData = await HomePage.findOne().populate("courses");
    return res.status(200).json({ homePageData });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createHomePageData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHomePageData = new HomePage(req.body);
    const savedHomePageData = await newHomePageData.save();

    return res.status(201).json({ homePageData: savedHomePageData });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  readHomePageData,
  createHomePageData,
};
