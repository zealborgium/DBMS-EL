import { Request, Response } from "express";
import Paper from "../models/paperModel";
import User from "../models/userModel";

// ✅ 1️⃣ Submit Paper (Author Only)
export const submitPaper = async (req: Request, res: Response) => {
  try {
    const { title, abstract, content } = req.body;
    const authorId = req.user?.id; // Ensure req.user is populated

    if (!title || !abstract || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPaper = new Paper({ title, abstract, content, author: authorId });
    await newPaper.save();

    res.status(201).json({ message: "Paper submitted successfully", paper: newPaper });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ 2️⃣ Assign Paper to a Reviewer (Admin Only)
export const assignPaper = async (req: Request, res: Response) => {
  try {
    const { paperId, reviewerId } = req.body;

    // Validate reviewer
    const reviewer = await User.findById(reviewerId);
    if (!reviewer || reviewer.role !== "reviewer") {
      return res.status(400).json({ message: "Invalid reviewer ID" });
    }

    // Assign paper
    const paper = await Paper.findByIdAndUpdate(
      paperId,
      { assignedReviewer: reviewerId, status: "under review" },
      { new: true }
    );

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json({ message: "Paper assigned successfully", paper });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ 3️⃣ Review Paper (Reviewer Only)
export const reviewPaper = async (req: Request, res: Response) => {
  try {
    const { paperId, feedback, status } = req.body;
    const reviewerId = req.user?.id;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Ensure paper exists and reviewer is assigned
    const paper = await Paper.findOne({ _id: paperId, assignedReviewer: reviewerId });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found or not assigned to you" });
    }

    // Update review status and feedback
    paper.status = status;
    paper.feedback = feedback;
    await paper.save();

    res.json({ message: "Review submitted", paper });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ 4️⃣ Get Author's Papers
export const getMyPapers = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;
    const papers = await Paper.find({ author: authorId });

    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ 5️⃣ Get All Papers (Admin Only)
export const getAllPapers = async (req: Request, res: Response) => {
  try {
    const papers = await Paper.find().populate("author assignedReviewer", "name email");
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
