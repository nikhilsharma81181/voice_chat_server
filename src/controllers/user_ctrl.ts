import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user_model";
import { AuthenticatedRequest } from "../middleware/types";

const createUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, age, collageName, branch, courseYear } = req.body;
  const phone = req.user.phone;

  try {
    const existingUser = await User.findOne({ phone: phone });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this phone number already exists." });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        phone,
        email,
        age,
        collageName,
        branch,
        courseYear,
      });

      const savedUser = await user.save();
      return res.status(201).json(savedUser);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const readUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // The phone is extracted from the token using the authenticateJWT middleware
    const phone = req.user.phone;
    const user = await User.findOne({ phone: phone });

    return user
      ? res.status(200).json({ user })
      : res.status(404).json({ error: "User not found." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const phone = req.user.phone;
    const user = await User.findOne({ phone: phone });

    if (user) {
      user.set(req.body);
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const phone = req.user.phone;
    const user = await User.findOneAndDelete({ phone: phone });

    return user
      ? res.status(200).json({ message: "User deleted successfully" })
      : res.status(404).json({ error: "User not found." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export default { createUser, readUser, readAllUser, updateUser, deleteUser };
