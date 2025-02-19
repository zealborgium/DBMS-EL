import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MyPapers = () => {
  const papers = [
    {
      title: "Research Paper 1",
      status: "Pending",
      uploadDate: "2025-02-18",
    },
    {
      title: "Research Paper 2",
      status: "Approved",
      uploadDate: "2025-01-20",
    },
  ];

  const handleEdit = (paperTitle: string) => {
    alert(`Editing ${paperTitle}`);
  };

  const handleResubmit = (paperTitle: string) => {
    alert(`Resubmitting ${paperTitle}`);
  };

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <h2 className="text-center text-primary mb-4">My Submitted Papers</h2>
          {papers.map((paper, index) => (
            <Card key={index} className="mb-3 shadow-lg border-0 rounded-3">
              <Card.Body>
                <h5 className="card-title">{paper.title}</h5>
                <p>Status: {paper.status}</p>
                <p>Upload Date: {paper.uploadDate}</p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(paper.title)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleResubmit(paper.title)}
                  >
                    Resubmit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyPapers;
