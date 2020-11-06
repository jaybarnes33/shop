import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <footer className="text-center py-3">
              Copyright &copy; Atrady - All Rights Reserved
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
