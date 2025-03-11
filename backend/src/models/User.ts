import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileImageUrl:string,
  title:string
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl :{type:String},
    title: {type:String}
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
