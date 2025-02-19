import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className="container mt-5 pt-5 shadow p-4 bg-white rounded justify-content-center align-items-center"
      style={{ marginTop: "10rem", paddingTop: "2rem" }}
    >
      <h2 className="text-center">Author Dashboard</h2>
      <p className="text-muted text-center">
        Manage your submissions and track reviews.
      </p>
      <div className="row text-center">
        <div className="col-md-6">
          <h3>Submit New Paper</h3>
          <p>Upload and manage your research submissions.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/submit")}
          >
            Submit Paper
          </button>
        </div>
        <div className="col-md-6">
          <h3>My Papers</h3>
          <p>Track the status of submitted papers.</p>
          <button
            className="btn btn-success"
            onClick={() => navigate("/my-papers")}
          >
            View Submissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
