"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Example Route
router.get("/", (req, res) => {
    res.send("Auth Route Working");
});
exports.default = router; // ✅ Make sure this is exported as default
