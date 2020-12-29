import React from "react";
import { Link } from "react-router-dom";
import styles from "../screens/css/home.module.css";
import { Row, Col } from "react-bootstrap";
const Heading = ({ title }) => {
  return (
    <div className={styles.heading}>
      <Row>
        <Col md={8}>{title}</Col>
        <Col md={4} className={styles.right}>
          <Link
            to={`/products/categories/${title
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            See All
          </Link>
          <i className="ml-2 fa fa-caret-right"></i>
        </Col>
      </Row>
    </div>
  );
};

export default Heading;
