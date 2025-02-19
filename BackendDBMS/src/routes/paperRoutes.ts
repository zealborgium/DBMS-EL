import express from "express";
import { submitPaper, getMyPapers, assignPaper, reviewPaper, getAllPapers } from "../controllers/paperController";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";

const router = express.Router();

// ✅ Author submits a paper
router.post("/submit", verifyToken, requireRole(["author"]), submitPaper);

// ✅ Author fetches submitted papers
router.get("/my-papers", verifyToken, requireRole(["author"]), getMyPapers);

// ✅ Admin assigns papers
router.post("/assign", verifyToken, requireRole(["admin"]), assignPaper);

// ✅ Reviewer reviews papers
router.post("/review", verifyToken, requireRole(["reviewer"]), reviewPaper);

// ✅ Admin fetches all papers
router.get("/all", verifyToken, requireRole(["admin"]), getAllPapers);

export default router;
