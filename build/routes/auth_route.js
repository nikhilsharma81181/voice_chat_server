"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_ctrl_1 = __importDefault(require("../controllers/auth_ctrl"));
const router = express_1.default.Router();
router.post("/send-otp", auth_ctrl_1.default.sendOtp);
router.post("/verify-otp", auth_ctrl_1.default.verifyOtp);
module.exports = router;
