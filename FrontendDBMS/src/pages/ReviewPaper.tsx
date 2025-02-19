import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { FaComment } from "react-icons/fa";

const ReviewPaper = () => {
  const [paper, setPaper] = useState<string | null>(null); // Dummy placeholder for now
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [rating, setRating] = useState<number>(5);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleCommentChange = (page: number, comment: string) => {
    setComments((prev) => ({ ...prev, [page]: comment }));
  };

  const handleSubmitReview = () => {
    alert(`Feedback submitted with rating: ${rating}`);
    setShowFeedbackModal(false);
  };

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body>
              <h2 className="text-center text-primary mb-4">Review Paper</h2>

              {/* Dummy PDF Upload Feature */}
              <Form.Group controlId="pdfUpload" className="mb-3">
                <Form.Label>Upload PDF (Dummy)</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    alert("PDF Upload feature will be implemented soon!");
                  }}
                />
              </Form.Group>

              <div
                style={{
                  position: "relative",
                  height: "400px",
                  background: "#ddd",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                <p className="text-muted">PDF Preview will be shown here</p>
              </div>

              {/* Comment Panel */}
              <Form.Group className="mt-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comments[pageNumber] || ""}
                  onChange={(e) =>
                    handleCommentChange(pageNumber, e.target.value)
                  }
                  placeholder="Add your comment here..."
                />
              </Form.Group>

              {/* Inline Comment Button */}
              <Button
                variant="link"
                className="mt-2"
                onClick={() => alert("Inline comment feature coming soon")}
              >
                <FaComment size={24} /> Add Inline Comment
              </Button>

              {/* Rating Slider (Kept as is) */}
              <Form.Group controlId="formRating" className="mt-3">
                <Form.Label>Rating (1-10)</Form.Label>
                <Form.Range
                  value={rating}
                  min={1}
                  max={10}
                  step={1}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between">
                  <span>1</span>
                  <span>10</span>
                </div>
              </Form.Group>

              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={() => setShowFeedbackModal(true)}
              >
                Submit Review
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feedback Modal */}
      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Provide Final Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFeedback">
            <Form.Label>Final Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your final feedback for the paper..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFeedbackModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ReviewPaper;
