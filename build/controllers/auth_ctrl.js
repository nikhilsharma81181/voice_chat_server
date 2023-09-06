"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "TheB7cSbVyLvahq5BetpbcV/LccVBDnm+5GBMG6q5aA=";
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);
const sendOtp = (req, res) => {
    const phone = req.body.phone;
    client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phone, channel: "sms" })
        .then((verification) => {
        console.log(verification.status);
        res.send({ message: "OTP sent!" });
    })
        .catch((error) => {
        console.error("Failed to send OTP:", error);
        res.status(500).send({ error: "Failed to send OTP" });
    });
};
const verifyOtp = (req, res) => {
    const phone = req.body.phone;
    const otpCode = req.body.otp;
    client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phone, code: otpCode })
        .then((verification_check) => {
        console.log(verification_check.status);
        if (verification_check.status === "approved") {
            // Sign a JWT token with the user's phone number
            const token = jsonwebtoken_1.default.sign({ phone }, JWT_SECRET, { expiresIn: "365d" });
            res.send({ success: true, token });
        }
        else {
            res.status(400).send({ error: "Invalid OTP" });
        }
    })
        .catch((error) => {
        console.error("Failed to verify OTP:", error);
        res.status(500).send({ error: "Failed to verify OTP" });
    });
};
exports.default = {
    sendOtp,
    verifyOtp,
};
