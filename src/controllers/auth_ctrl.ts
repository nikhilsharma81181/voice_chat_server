import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "TheB7cSbVyLvahq5BetpbcV/LccVBDnm+5GBMG6q5aA=";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

const sendOtp = (req: Request, res: Response) => {
  const phone = req.body.phone;

  client.verify.v2
    .services(verifySid)
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification: { status: any }) => {
      console.log(verification.status);
      res.send({ message: "OTP sent!" });
    })
    .catch((error: any) => {
      console.error("Failed to send OTP:", error);
      res.status(500).send({ error: "Failed to send OTP" });
    });
};

const verifyOtp = (req: Request, res: Response) => {
  const phone = req.body.phone;
  const otpCode = req.body.otp;

  client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: phone, code: otpCode })
    .then((verification_check: { status: string }) => {
      console.log(verification_check.status);
      if (verification_check.status === "approved") {
        // Sign a JWT token with the user's phone number
        const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "365d" });
        res.send({ success: true, token });
      } else {
        res.status(400).send({ error: "Invalid OTP" });
      }
    })
    .catch((error: any) => {
      console.error("Failed to verify OTP:", error);
      res.status(500).send({ error: "Failed to verify OTP" });
    });
};

export default {
  sendOtp,
  verifyOtp,
};
