import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFileAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import "../App.css";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <h1 className="display-4 fw-bold">
          Welcome to the Conference Management System
        </h1>
        <p className="lead text-muted">
          Streamline research paper submission, review, and conference
          management effortlessly.
        </p>
        {!auth.user ? (
          <button
            className="btn btn-lg btn-primary shadow-sm mt-3"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        ) : (
          <button
            className="btn btn-lg btn-success shadow-sm mt-3"
            onClick={() => {
              if (auth.user?.role === "author") {
                navigate("/author-dashboard");
              } else if (auth.user?.role === "reviewer") {
                navigate("/reviewer-dashboard");
              } else if (auth.user?.role === "admin") {
                navigate("/admin-dashboard");
              } else {
                navigate("/"); // Default home page if role is undefined
              }
            }}
          >
            Go to Dashboard
          </button>
        )}
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Core Features</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="feature-card shadow">
              <FaFileAlt size={50} className="feature-icon" />
              <h3>Submit Papers</h3>
              <p>Authors can submit research papers seamlessly.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card shadow">
              <FaClipboardList size={50} className="feature-icon" />
              <h3>Review System</h3>
              <p>Reviewers can evaluate and provide feedback on submissions.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card shadow">
              <FaUsers size={50} className="feature-icon" />
              <h3>Admin Management</h3>
              <p>Admins oversee submissions, reviews, and notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Info */}
      {auth.user && (
        <section className="container text-center mt-5">
          <h2>Your Dashboard</h2>
          <p className="text-muted">
            Welcome, {auth.user.name}! Here's what you can do:
          </p>
          {auth.user.role === "admin" && (
            <p>
              Manage users, assign reviewers, and oversee conference activities.
            </p>
          )}
          {auth.user.role === "reviewer" && (
            <p>Review assigned papers and provide feedback.</p>
          )}
          {auth.user.role === "author" && (
            <p>Submit your research papers and track reviews.</p>
          )}
          <p className="text-muted">
            Proceed by clicking on the "Go to Dashboard" button or use Navbar.
          </p>
        </section>
      )}

      {/* Footer */}
      <footer className="footer text-center">
        <p>Conference Management System | An Overview</p>
      </footer>
    </div>
  );
};

export default Home;
