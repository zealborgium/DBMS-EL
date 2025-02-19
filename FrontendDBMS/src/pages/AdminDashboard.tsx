import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { getPapers, getUsers, assignReviewer } from "../api/admin"; // Hypothetical API functions

const AdminDashboard = () => {
  const [papers, setPapers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedReviewer, setSelectedReviewer] = useState<any>(null);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    const fetchData = async () => {
      const papersRes = await API.get("/api/papers/all");
      const reviewersRes = await API.get("/api/users/reviewers");
      setPapers(papersRes.data);
      setReviewers(reviewersRes.data);
    };

    fetchData();
  }, []);

  // Function to handle reviewer assignment
  const handleAssignReviewer = async () => {
    if (!selectedReviewer || !selectedPaper) {
      toast.error("Please select a reviewer and a paper.");
      return;
    }
    try {
      await assignReviewer(selectedPaper.id, selectedReviewer.value); // Send request to backend
      toast.success("Reviewer assigned successfully!");
      // Refresh the paper list to reflect changes
      getPapers().then(setPapers);
    } catch (error) {
      toast.error("Failed to assign reviewer.");
    }
  };

  // Filter papers based on status
  const filteredPapers = papers.filter((paper) => {
    if (filterStatus === "All") return true;
    return paper.status === filterStatus;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Filter Papers by Status */}
      <div className="mb-4">
        <label htmlFor="filterStatus">Filter Papers by Status:</label>
        <select
          id="filterStatus"
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Papers List */}
      <h3>Papers List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPapers.map((paper) => (
            <tr key={paper.id}>
              <td>{paper.title}</td>
              <td>{paper.status}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedPaper(paper)}
                  data-bs-toggle="modal"
                  data-bs-target="#assignReviewerModal"
                >
                  Assign Reviewer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reviewer Assignment Modal */}
      <div
        className="modal fade"
        id="assignReviewerModal"
        tabIndex={-1}
        aria-labelledby="assignReviewerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="assignReviewerModalLabel">
                Assign Reviewer to {selectedPaper ? selectedPaper.title : ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="reviewer">Select Reviewer:</label>
              <Select
                id="reviewer"
                options={users
                  .filter((user) => user.role === "reviewer")
                  .map((user) => ({
                    label: user.name,
                    value: user.id,
                  }))}
                value={selectedReviewer}
                onChange={setSelectedReviewer}
                placeholder="Select Reviewer"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAssignReviewer}
              >
                Assign Reviewer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Management */}
      <h3 className="mt-5">User Management</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning me-2">Promote</button>
                <button className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
