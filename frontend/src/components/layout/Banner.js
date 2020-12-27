import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Campaigns from "./Campaigns";
import Categories from "./Categories";
import styles from "./css/banner.module.css";
import Support from "./Support";
const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container>
        <Row>
          <Col lg={3} md={0} xs={0}>
            <Categories />
          </Col>
          <Col lg={6} md={10} xs={12}>
            <Campaigns />
          </Col>
          <Col lg={3} md={2} className={styles.desktopOnly}>
            <Support />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
