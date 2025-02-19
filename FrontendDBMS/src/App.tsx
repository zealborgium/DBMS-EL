import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubmitPaper from "./pages/SubmitPaper";
import MyPapers from "./pages/MyPapers";
import AssignedPapers from "./pages/AssignedPapers";
import ReviewPaper from "./pages/ReviewPaper";
import AdminDashboard from "./pages/AdminDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  const auth = useContext(AuthContext);

  return (
    <>
      <div style={{ paddingTop: "12rem" }}>
        <Navbar user={auth.user} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Author Routes */}
          <Route
            path="/author-dashboard"
            element={
              <ProtectedRoute allowedRoles={["author"]}>
                <AuthorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute allowedRoles={["author"]}>
                <SubmitPaper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-papers"
            element={
              <ProtectedRoute allowedRoles={["author"]}>
                <MyPapers />
              </ProtectedRoute>
            }
          />

          {/* Reviewer Routes */}
          <Route
            path="/reviewer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["reviewer"]}>
                <ReviewerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assigned-papers"
            element={
              <ProtectedRoute allowedRoles={["reviewer"]}>
                <AssignedPapers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review-paper"
            element={
              <ProtectedRoute allowedRoles={["reviewer"]}>
                <ReviewPaper />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
