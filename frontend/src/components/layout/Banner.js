import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Campaigns from "./Campaigns";
import Categories from "./Categories";
import styles from "./css/banner.module.css";
const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container>
        <Row>
          <Col lg={3} md={0} xs={0}>
            <Categories />
          </Col>
          <Col lg={6} md={9} xs={9}>
            <Campaigns />
          </Col>
          <Col lg={3} md={3} xs={3}>
            <Row>
              <Col xs={12}>
                <Image className="my-2" src="/uploads/campaigns/1.png" fluid />
              </Col>
              <Col xs={12}>
                <Image className="my-2" src="/uploads/campaigns/2.png" fluid />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
