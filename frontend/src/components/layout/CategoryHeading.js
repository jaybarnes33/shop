import React from "react";
import styles from "../screens/css/home.module.css";
import { Row, Col } from "react-bootstrap";
const Heading = ({ title }) => {
  return (
    <div className={styles.heading}>
      <Row>
        <Col xs={8}>
          {title
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ")}
        </Col>
      </Row>
    </div>
  );
};

export default Heading;
