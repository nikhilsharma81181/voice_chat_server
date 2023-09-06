import mongoose, { Document, Schema } from "mongoose";
import CourseSchema from "../models/course_model";

const StatsSchema = new Schema({
  courses: { type: Number, required: true },
  students: { type: Number, required: true },
  mentors: { type: Number, required: true },
  internships: { type: Number, required: true },
});

const UpcomingSessionSchema = new Schema({
  photoUrl: { type: String, required: true },
  link: { type: String, required: true },
});

const TestimonialSchema = new Schema({
  messageTitle: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  name: { type: String, required: true },
  ratings: { type: String, required: true },
});

const SocialsSchema = new Schema({
  linkedin: { type: String },
  facebook: { type: String },
  instagram: { type: String },
});

const TeamSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photoUrl: { type: String, required: true },
  socials: { type: SocialsSchema, required: true },
});



const HomePageSchema = new Schema({
  stats: { type: StatsSchema, required: true },
  upcoming_sessions: { type: [UpcomingSessionSchema], required: true },
  testimonials: { type: [TestimonialSchema], required: true },
  teams: { type: [TeamSchema], required: true },
  courseGenre: { type: [String], required: true },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: CourseSchema, // Reference to the Course model
      validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
  ],
});

function arrayLimit(val: string | any[]) {
  return val.length <= 3;
}

export default mongoose.model(
  "HomePage",
  HomePageSchema,
  "homepage"
);
