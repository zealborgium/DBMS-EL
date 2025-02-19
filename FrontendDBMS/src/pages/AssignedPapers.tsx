import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AssignedPapers = () => {
  const assignedPapers = [
    { title: "Research Paper 1", status: "Pending" },
    { title: "Research Paper 2", status: "Under Review" },
  ];

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <h2 className="text-center text-primary mb-4">Assigned Papers</h2>
          {assignedPapers.map((paper, index) => (
            <Card key={index} className="mb-3 shadow-lg border-0 rounded-3">
              <Card.Body>
                <h5 className="card-title">{paper.title}</h5>
                <p>Status: {paper.status}</p>
                <Button variant="primary" href={`/review-paper/${index}`}>
                  Review
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AssignedPapers;
