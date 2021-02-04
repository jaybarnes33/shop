import React from "react";
import { Link } from "react-router-dom";
import styles from "../screens/css/home.module.css";
import { Row, Col } from "react-bootstrap";
const Heading = ({ title }) => {
  return (
    <div className={styles.heading}>
      <Row>
        <Col xs={10}>{title}</Col>
        <Col xs={2} className={styles.right}>
          <Link
            to={`/products/categories/${title
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            <i className="ml-2 fa fa-chevron-right"></i>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Heading;
