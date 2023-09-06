import express from "express";
import controller from "../controllers/auth_ctrl";

const router = express.Router();

router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);

export = router;
