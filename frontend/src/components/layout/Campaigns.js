import React from "react";
import { Carousel, Image, Container } from "react-bootstrap";
import styles from "./css/banner.module.css";
const Campaigns = () => {
  return (
    <>
      <Carousel
        pause="hover"
        indicators={true}
        interval={3000}
        fade={true}
        className={styles.desktopOnly}
      >
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
        <Carousel.Item>
          <Image
            className={styles.campaign}
            src="/uploads/campaigns/2.png"
            fluid
          />
        </Carousel.Item>
      </Carousel>

      <div className={styles.campaigns}>
        <Image src="/uploads/campaigns/1.png" fluid />
        <Image src="/uploads/campaigns/2.png" fluid />
        <Image src="/uploads/campaigns/1.png" fluid />
        <Image src="/uploads/campaigns/2.png" fluid />
        <Image src="/uploads/campaigns/1.png" fluid />
        <Image src="/uploads/campaigns/2.png" fluid />
      </div>
    </>
  );
};

export default Campaigns;
