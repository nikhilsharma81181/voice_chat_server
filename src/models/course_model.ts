import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  subTitle: string;
  groupName: string;
  genre: string;
  description: string;
  photoUrl: string;
  actualPrice: number;
  currentPrice: number;
  ratings: number;
  ratingsNumber: number;
  enrolledStudents: number;
  facultyTeachers: string[];
  totalHours: string;
  totalLectures: string;
  level: string;
  tag: string;
  videoUrl: string;
  problemSolvedNumber: string;
  courseDuration: string;
  aboutCourse: string;
  audioLanguage: string;
  subTitleLanguage: string;
  duration: string;
  totalModules: string;
  totalChallenges: string;
  isCertificateIncluded: string;
  whatWillLearn: object;
  requirements: string[];
  keyFeatures: string[];
  roadmap: object;
  certificate: object;
  testimonials: object[];
  faqs: object[];
}

export interface ICourseModel extends ICourse, Document {}

const CourseSchema: Schema = new Schema(
  {
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
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICourseModel>("Course", CourseSchema);
