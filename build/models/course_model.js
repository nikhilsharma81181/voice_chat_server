"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    groupName: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    actualPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    ratings: { type: Number, required: true },
    ratingsNumber: { type: Number, required: true },
    enrolledStudents: { type: Number, required: true },
    facultyTeachers: { type: [String], required: true },
    totalHours: { type: String, required: true },
    totalLectures: { type: String, required: true },
    level: { type: String, required: true },
    tag: { type: String, required: true },
    videoUrl: { type: String, required: true },
    problemSolvedNumber: { type: String, required: true },
    courseDuration: { type: String, required: true },
    aboutCourse: { type: String, required: true },
    audioLanguage: { type: String, required: true },
    subTitleLanguage: { type: String, required: true },
    duration: { type: String, required: true },
    totalModules: { type: String, required: true },
    totalChallenges: { type: String, required: true },
    isCertificateIncluded: { type: String, required: true },
    whatWillLearn: {
        title: { type: String, required: true },
        points: [{ type: String, required: true }],
    },
    requirements: { type: [String], required: true },
    keyFeatures: { type: [String], required: true },
    roadmap: {
        type: {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
        required: true,
    },
    certificate: {
        type: {
            title: { type: String, required: true },
            description: { type: String, required: true },
            imageUrl: { type: String, required: true },
        },
        required: true,
    },
    testimonials: {
        type: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                imageUrl: { type: String, required: true },
                studentName: { type: String, required: true },
                ratings: { type: Number, required: true },
            },
        ],
        required: true,
    },
    faqs: {
        type: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
        required: true,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Course", CourseSchema);
