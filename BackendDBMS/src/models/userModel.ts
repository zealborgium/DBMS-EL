import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, // Ensures emails are always stored in lowercase
        trim: true, // Removes leading/trailing spaces
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email regex validation
      },
      password: { type: String, required: true },
      role: { type: String, enum: ["author", "reviewer", "admin"], default: "author" },
    },
    { timestamps: true }
  );  

const User = mongoose.model<IUser>("User", UserSchema);

export default User; 

