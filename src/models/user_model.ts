import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  age: number;
  collageName: string;
  branch: string;
  courseYear: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    age: { type: Number, required: false },
    collageName: { type: String, required: false },
    branch: { type: String, required: false },
    courseYear: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
