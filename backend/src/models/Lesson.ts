import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ILesson extends Document {
    moduleId: mongoose.Schema.Types.ObjectId | string;
    title: string;
    description:string;
    contentType: string;
    videoUrl?: string;
    duration:string;
    order: number;
    attachments?: string[]; 
    createdAt?: Date;
    updatedAt?: Date;
}

const LessonSchema = new Schema<ILesson>(
    {
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
      title: { type: String, required: true },
      description: {type:String, required:true},
      contentType: { type: String, required: true },
      videoUrl: { type: String },
      duration:{type:String},
      order: { type: Number, required: true },
      attachments: [{ type: String }], 
    },
    { timestamps: true }
  );
  
  export const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);