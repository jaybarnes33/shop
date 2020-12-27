import React from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import styles from "./css/banner.module.css";
import { Link } from "react-router-dom";
const Support = () => {
  return (
    <Card className={styles.support} style={{ width: "100%" }}>
      <div>
        <a href="tel:233543288559">
          <Row>
            <Col md={3}>
              <span>
                <i className="fa fa-phone-alt"></i>
              </span>
            </Col>
            <Col className={styles.left}>Help Center</Col>
          </Row>
        </a>
      </div>
    </Card>
  );
};

export default Support;
