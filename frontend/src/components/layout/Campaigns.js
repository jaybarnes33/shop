import React from "react";
import { Carousel, Image, Row } from "react-bootstrap";
import styles from "./css/banner.module.css";
const Campaigns = () => {
  return (
    <Carousel pause="hover">
      <Carousel.Item>
        <Image
          className={styles.campaign}
          src="/uploads/campaigns/1.png"
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={styles.campaign}
          src="/uploads/campaigns/2.png"
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={styles.campaign}
          src="/uploads/campaigns/1.png"
          fluid
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Campaigns;
