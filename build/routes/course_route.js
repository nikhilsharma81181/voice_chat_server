"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const course_ctrl_1 = __importDefault(require("../controllers/course_ctrl"));
const router = express_1.default.Router();
router.post("/create", course_ctrl_1.default.createCourse);
router.get("/getById", course_ctrl_1.default.readCourse);
router.get("/get", course_ctrl_1.default.readAllCourses);
router.post("/update/:courseId", course_ctrl_1.default.updateCourse);
router.delete("/delete/:courseId", course_ctrl_1.default.deleteCourse);
router.get("/search", course_ctrl_1.default.searchCourses);
module.exports = router;
