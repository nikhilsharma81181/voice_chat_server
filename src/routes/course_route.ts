import express from "express";
import controller from "../controllers/course_ctrl";

const router = express.Router();

router.post("/create", controller.createCourse);
router.get("/getById", controller.readCourse);
router.get("/get", controller.readAllCourses);
router.post("/update/:courseId", controller.updateCourse);
router.delete("/delete/:courseId", controller.deleteCourse);
router.get("/search", controller.searchCourses);

export = router;
