import express from "express";
import controller from "../controllers/user_ctrl";
import { authenticateJWT } from "../middleware/auth_middleware";

const router = express.Router();

router.post("/create", authenticateJWT, controller.createUser);
router.get("/get", authenticateJWT, controller.readUser);
router.post("/update", authenticateJWT, controller.updateUser);
// router.get("/get/", controller.readAllUser);
router.delete("/delete", authenticateJWT, controller.deleteUser);

export = router;
