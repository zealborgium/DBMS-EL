import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import api from "../utils/axiosInstance";

interface Paper {
  _id: string;
  title: string;
  status: string;
  uploadDate: string;
}

const MyPapers = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await api.get("/papers/my-papers"); // 🔥 Fetch papers from backend
        setPapers(response.data);
      } catch (err) {
        setError("Failed to fetch papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleEdit = (paperId: string) => {
    alert(`Editing paper ID: ${paperId}`);
  };

  const handleResubmit = async (paperId: string) => {
    try {
      await api.post(`/papers/resubmit/${paperId}`); // 🔥 Backend resubmission API
      alert("Paper resubmitted successfully!");
    } catch (err) {
      alert("Failed to resubmit the paper.");
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <h2 className="text-center text-primary mb-4">My Submitted Papers</h2>

          {loading ? (
            <Spinner
              animation="border"
              variant="primary"
              className="d-block mx-auto"
            />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : papers.length === 0 ? (
            <Alert variant="info">No papers submitted yet.</Alert>
          ) : (
            papers.map((paper) => (
              <Card
                key={paper._id}
                className="mb-3 shadow-lg border-0 rounded-3"
              >
                <Card.Body>
                  <h5 className="card-title">{paper.title}</h5>
                  <p>Status: {paper.status}</p>
                  <p>
                    Upload Date:{" "}
                    {new Date(paper.uploadDate).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(paper._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleResubmit(paper._id)}
                      disabled={paper.status === "Approved"}
                    >
                      Resubmit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyPapers;
