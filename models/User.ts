import { Schema, model, Document } from "mongoose";

export interface userModelInterface extends Document {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  isAdmin: boolean;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<userModelInterface>("User", UserSchema);
