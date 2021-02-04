import React from "react";
import { Image, Card, ListGroup, Row, Col } from "react-bootstrap";
import styles from "./css/banner.module.css";
import { Link } from "react-router-dom";
const Support = () => {
  return (
    <div className={styles.support}>
      <Card className={styles.supportCard}>
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
      </Card>
      <Image
        className={styles.smallBanner}
        src="/uploads/campaigns/mkup.jpg"
        fluid
      />
    </div>
  );
};

export default Support;
