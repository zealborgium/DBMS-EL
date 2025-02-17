import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  backgroundColor: "#f8f9fa",
};
const cardStyle = {
  borderRadius: "10px",
};
const cardBodyStyle = {
  padding: "3rem",
};
const formControlStyle = {
  padding: "0.8rem",
  borderRadius: "8px",
  fontSize: "1rem",
};
const buttonStyle = {
  padding: "0.8rem",
  borderRadius: "8px",
};
const buttonHoverStyle = {
  backgroundColor: "#007BFF",
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={containerStyle} // Applying background color here
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-3" style={cardStyle}>
            <Card.Body style={cardBodyStyle}>
              <h2 className="text-center text-primary mb-4">
                Login to Your Account
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={formControlStyle} // Applying custom form styles
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={formControlStyle} // Applying custom form styles
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={buttonStyle} // Applying custom button styles
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
