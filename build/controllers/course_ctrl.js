"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const course_model_1 = __importDefault(require("../models/course_model"));
const createCourse = async (req, res, next) => {
    const { title, subTitle, groupName, genre, description, photoUrl, actualPrice, currentPrice, ratings, ratingsNumber, enrolledStudents, facultyTeachers, totalHours, totalLectures, level, tag, videoUrl, problemSolvedNumber, courseDuration, aboutCourse, audioLanguage, subTitleLanguage, duration, totalModules, totalChallenges, isCertificateIncluded, whatWillLearn, requirements, keyFeatures, roadmap, certificate, testimonials, faqs, } = req.body;
    const course = new course_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        subTitle,
        groupName,
        genre,
        description,
        photoUrl,
        actualPrice,
        currentPrice,
        ratings,
        ratingsNumber,
        enrolledStudents,
        facultyTeachers,
        totalHours,
        totalLectures,
        level,
        tag,
        videoUrl,
        problemSolvedNumber,
        courseDuration,
        aboutCourse,
        audioLanguage,
        subTitleLanguage,
        duration,
        totalModules,
        totalChallenges,
        isCertificateIncluded,
        whatWillLearn,
        requirements,
        keyFeatures,
        roadmap,
        certificate,
        testimonials,
        faqs,
    });
    try {
        const createdCourse = await course.save();
        return res.status(201).json(createdCourse);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
const readCourse = async (req, res, next) => {
    const courseId = req.query.courseId;
    try {
        const course = await course_model_1.default.findById(courseId);
        return course
            ? res.status(200).json({ course })
            : res.status(404).json({ error: "Course not found." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const readAllCourses = async (req, res, next) => {
    try {
        const courses = await course_model_1.default.find();
        const groupedCourses = {};
        for (const course of courses) {
            const groupName = course.groupName;
            if (!groupedCourses[groupName]) {
                groupedCourses[groupName] = [];
            }
            groupedCourses[groupName].push(course);
        }
        const result = [];
        for (const [groupName, courses] of Object.entries(groupedCourses)) {
            result.push({
                GroupTitle: groupName,
                courses: courses,
            });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const updateCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }
        course.set(req.body);
        const updatedCourse = await course.save();
        return res.status(200).json(updatedCourse);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const deleteCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const deletedCourse = await course_model_1.default.findByIdAndDelete(courseId);
        return deletedCourse
            ? res.status(201).json({ message: "Course deleted" })
            : res.status(404).json({ error: "Course not found." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
const searchCourses = async (req, res, next) => {
    const keyword = req.query.keyword; // Explicitly cast the keyword to string
    try {
        // Use a regular expression to perform a case-insensitive search for the keyword
        const regex = new RegExp(keyword, "i");
        const courses = await course_model_1.default.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { facultyTeachers: { $regex: regex } },
            ],
        });
        return res.status(200).json({ courses });
    }
    catch (error) {
        console.log(`Errorr: not found ${keyword}`);
        return res.status(500).json({ error });
    }
};
exports.default = {
    createCourse,
    readCourse,
    readAllCourses,
    updateCourse,
    deleteCourse,
    searchCourses,
};
