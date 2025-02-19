import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

const SubmitPaper = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF or DOCX file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !abstract || !keywords || !file) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // Simulate an API request
      setTimeout(() => {
        setLoading(false);
        alert("Paper submitted successfully!");
        // Reset form
        setTitle("");
        setAbstract("");
        setKeywords("");
        setFile(null);
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError("An error occurred while submitting the paper.");
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center bg-light"
      style={{ marginTop: "-5rem" }}
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4">
              <h2 className="text-center text-primary mb-4">Submit Paper</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter paper title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAbstract" className="mb-3">
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formKeywords" className="mb-3">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Paper</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                  {error && !file && (
                    <p className="text-danger">Please upload a file.</p>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitPaper;
