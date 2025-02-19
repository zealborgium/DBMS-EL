import mongoose, { Schema, Document } from "mongoose";

// Paper Interface
export interface IPaper extends Document {
  title: string;
  abstract: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  assignedReviewer?: mongoose.Schema.Types.ObjectId;
  status: "pending" | "under review" | "accepted" | "rejected";
  feedback?: string;
  createdAt: Date;
}

// Paper Schema
const PaperSchema = new Schema<IPaper>(
  {
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedReviewer: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "under review", "accepted", "rejected"], default: "pending" },
    feedback: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPaper>("Paper", PaperSchema);
