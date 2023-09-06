"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_ctrl_1 = __importDefault(require("../controllers/user_ctrl"));
const auth_middleware_1 = require("../middleware/auth_middleware");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.authenticateJWT, user_ctrl_1.default.createUser);
router.get("/get", auth_middleware_1.authenticateJWT, user_ctrl_1.default.readUser);
router.post("/update", auth_middleware_1.authenticateJWT, user_ctrl_1.default.updateUser);
// router.get("/get/", controller.readAllUser);
router.delete("/delete", auth_middleware_1.authenticateJWT, user_ctrl_1.default.deleteUser);
module.exports = router;
