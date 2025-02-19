// src/pages/ReviewerDashboard.tsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReviewerDashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5 pt-5 shadow p-4 bg-white rounded">
      <h2 className="text-center">Reviewer Dashboard</h2>
      <p className="text-muted text-center">
        Manage your assigned reviews efficiently.
      </p>
      <div className="row text-center">
        <div className="col-md-6">
          <h3>Assigned Papers</h3>
          <p>View and manage assigned research papers.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/assigned-papers")}
          >
            View Papers
          </button>
        </div>
        <div className="col-md-6">
          <h3>Pending Reviews</h3>
          <p>Complete pending reviews before deadlines.</p>
          <button
            className="btn btn-success"
            onClick={() => navigate("/review-paper")}
          >
            Review Papers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;
