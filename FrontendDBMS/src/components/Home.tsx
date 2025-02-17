import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="p-5 bg-light min-vh-100 d-flex align-items-center"
    >
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={10}>
            {/* Cards Row */}
            <Row className="g-4 justify-content-center">
              {/* Card 1 */}
              <Col md={5} className="d-flex">
                <Card className="shadow-lg rounded-3 flex-fill">
                  <Card.Body>
                    <Card.Title className="fs-4 fw-bold">
                      🤝 Collaborative Platform
                    </Card.Title>
                    <Card.Text className="fs-6 text-secondary card-text-justified">
                      Our platform connects Researchers, Reviewers, and Editors,
                      streamlining the Peer-Review Process for better
                      collaboration.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Card 2 */}
              <Col md={5} className="d-flex">
                <Card className="shadow-lg rounded-3 flex-fill">
                  <Card.Body>
                    <Card.Title className="fs-4 fw-bold">
                      ⏱️ Real-Time Notifications
                    </Card.Title>
                    <Card.Text className="fs-6 text-secondary card-text-justified">
                      Stay updated with Real-Time Notifications, ensuring that
                      every Submission and Review is tracked and communicated
                      promptly.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Card 3 */}
              <Col md={5} className="d-flex">
                <Card className="shadow-lg rounded-3 flex-fill">
                  <Card.Body>
                    <Card.Title className="fs-4 fw-bold">
                      💡 Efficiency & Transparency
                    </Card.Title>
                    <Card.Text className="fs-6 text-secondary card-text-justified">
                      The system ensures Transparency, Efficiency, and a
                      User-Friendly Interface, providing seamless tracking and
                      management of the review workflow.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Call-to-Action Button */}
            <Button
              variant="primary"
              size="lg"
              className="mt-4"
              onClick={() => navigate("/submit-paper")}
            >
              📄 Submit Your Paper
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HomePage;
