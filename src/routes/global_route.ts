import express from "express";
import controller from "../controllers/home_ctrl";

const router = express.Router();

router.get("/homepage", controller.readHomePageData);
// router.post("/create", controller.createHomePageData);

export = router;