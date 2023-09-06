"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_model_1 = __importDefault(require("../models/home_model"));
const readHomePageData = async (req, res, next) => {
    try {
        const homePageData = await home_model_1.default.findOne().populate("courses");
        return res.status(200).json({ homePageData });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const createHomePageData = async (req, res, next) => {
    try {
        const newHomePageData = new home_model_1.default(req.body);
        const savedHomePageData = await newHomePageData.save();
        return res.status(201).json({ homePageData: savedHomePageData });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.default = {
    readHomePageData,
    createHomePageData,
};
