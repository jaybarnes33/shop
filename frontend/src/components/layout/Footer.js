import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Statement from "./Statement";

const Footer = () => {
  return (
    <div>
      <Container>
        <Statement />
      </Container>
      <footer className="text-center py-3">
        Copyright &copy; Atrady - All Rights Reserved
      </footer>
    </div>
  );
};

export default Footer;
