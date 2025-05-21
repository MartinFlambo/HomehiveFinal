// models/Task.ts
import { Schema, model, Types } from "mongoose";

interface ITask {
  title: string;
  description: string;
  dificult: string;
  completed: boolean;
  user: Types.ObjectId;
  score: number
  image: string; // ← nombre o path de imagen
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dificult: { type: String, required: true },
    completed: { type: Boolean, default: false},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0, required: true},

    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ITask>("Task", taskSchema);
