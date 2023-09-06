"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
const createUser = async (req, res, next) => {
    const { name, email, age, collageName, branch, courseYear } = req.body;
    const phone = req.user.phone;
    try {
        const existingUser = await user_model_1.default.findOne({ phone: phone });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User with this phone number already exists." });
        }
        else {
            const user = new user_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
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
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
const readUser = async (req, res, next) => {
    try {
        // The phone is extracted from the token using the authenticateJWT middleware
        const phone = req.user.phone;
        const user = await user_model_1.default.findOne({ phone: phone });
        return user
            ? res.status(200).json({ user })
            : res.status(404).json({ error: "User not found." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const readAllUser = async (req, res, next) => {
    try {
        const users = await user_model_1.default.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const updateUser = async (req, res, next) => {
    try {
        const phone = req.user.phone;
        const user = await user_model_1.default.findOne({ phone: phone });
        if (user) {
            user.set(req.body);
            const updatedUser = await user.save();
            return res.status(200).json(updatedUser);
        }
        else {
            return res.status(404).json({ error: "User not found." });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const phone = req.user.phone;
        const user = await user_model_1.default.findOneAndDelete({ phone: phone });
        return user
            ? res.status(200).json({ message: "User deleted successfully" })
            : res.status(404).json({ error: "User not found." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.default = { createUser, readUser, readAllUser, updateUser, deleteUser };
