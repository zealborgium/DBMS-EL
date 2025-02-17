import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Inline styles for clean design
const containerStyle = {
  backgroundColor: "#f8f9fa", // Light background color
};

const cardStyle = {
  borderRadius: "10px", // Rounded corners for card
};

const cardBodyStyle = {
  padding: "1.5rem", // Padding inside the card
};

const buttonStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  fontSize: "1rem",
};

const submitPaperFormStyle = {
  marginTop: "1.5rem", // Space between form and card title
};

function SubmitPaper() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form validation and submission logic here
    alert("Paper Submitted Successfully!");
    navigate("/"); // Navigate back to home after submission
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={containerStyle}
    >
      <Row className="w-100">
        <Col md={8} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-3" style={cardStyle}>
            <Card.Body style={cardBodyStyle}>
              <h2 className="text-center text-primary">Submit Your Paper</h2>
              <Form onSubmit={handleSubmit} style={submitPaperFormStyle}>
                {/* Title Field */}
                <Form.Group controlId="paperTitle" className="mb-3">
                  <Form.Label className="fw-bold">Paper Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the paper title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Abstract Field */}
                <Form.Group controlId="paperAbstract" className="mb-3">
                  <Form.Label className="fw-bold">Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter the abstract of your paper"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* File Upload Field */}
                <Form.Group controlId="paperFile" className="mb-3">
                  <Form.Label className="fw-bold">Upload Paper</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  style={buttonStyle}
                  className="w-100"
                >
                  Submit Paper
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitPaper;
