import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

const reviewCardStyle = {
  marginBottom: "1.5rem", // Space between cards
};

const reviews = [
  {
    id: 1,
    reviewer: "John Doe",
    paperTitle: "AI and the Future of Technology",
    review:
      "This paper provides an insightful analysis of AI's future and its impact on the technology industry.",
    date: "2025-02-15",
  },
  {
    id: 2,
    reviewer: "Jane Smith",
    paperTitle: "Cybersecurity in a Digital World",
    review:
      "A thorough examination of the challenges and solutions in cybersecurity, highly relevant in today's digital age.",
    date: "2025-02-14",
  },
  {
    id: 3,
    reviewer: "Michael Johnson",
    paperTitle: "Data Privacy and Ethics",
    review:
      "Well-written and comprehensive. The paper raises important questions about privacy in a data-driven world.",
    date: "2025-02-13",
  },
];

function Reviews() {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={containerStyle}
    >
      <Row className="w-100">
        <Col md={8} className="mx-auto">
          <h1 className="text-center text-primary mb-5">Reviews</h1>

          {reviews.map((review) => (
            <Card
              key={review.id}
              className="shadow-lg border-0 rounded-3"
              style={{ ...cardStyle, ...reviewCardStyle }}
            >
              <Card.Body style={cardBodyStyle}>
                <h4 className="fw-bold">{review.paperTitle}</h4>
                <p className="text-muted">
                  <strong>Reviewer: </strong> {review.reviewer}
                </p>
                <p>{review.review}</p>
                <p className="text-muted">
                  <strong>Reviewed on: </strong> {review.date}
                </p>

                <Link to={`/review-details/${review.id}`}>
                  <Button variant="outline-primary" style={buttonStyle}>
                    View Full Review
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;
