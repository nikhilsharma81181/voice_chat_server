"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const home_ctrl_1 = __importDefault(require("../controllers/home_ctrl"));
const router = express_1.default.Router();
router.get("/homepage", home_ctrl_1.default.readHomePageData);
module.exports = router;
