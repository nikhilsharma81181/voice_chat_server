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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const course_model_1 = __importDefault(require("../models/course_model"));
const StatsSchema = new mongoose_1.Schema({
    courses: { type: Number, required: true },
    students: { type: Number, required: true },
    mentors: { type: Number, required: true },
    internships: { type: Number, required: true },
});
const UpcomingSessionSchema = new mongoose_1.Schema({
    photoUrl: { type: String, required: true },
    link: { type: String, required: true },
});
const TestimonialSchema = new mongoose_1.Schema({
    messageTitle: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    name: { type: String, required: true },
    ratings: { type: String, required: true },
});
const SocialsSchema = new mongoose_1.Schema({
    linkedin: { type: String },
    facebook: { type: String },
    instagram: { type: String },
});
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    photoUrl: { type: String, required: true },
    socials: { type: SocialsSchema, required: true },
});
const HomePageSchema = new mongoose_1.Schema({
    stats: { type: StatsSchema, required: true },
    upcoming_sessions: { type: [UpcomingSessionSchema], required: true },
    testimonials: { type: [TestimonialSchema], required: true },
    teams: { type: [TeamSchema], required: true },
    courseGenre: { type: [String], required: true },
    courses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: course_model_1.default,
            validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
        },
    ],
});
function arrayLimit(val) {
    return val.length <= 3;
}
exports.default = mongoose_1.default.model("HomePage", HomePageSchema, "homepage");
