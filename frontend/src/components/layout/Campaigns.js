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
            src="/uploads/campaigns/mkup.jpg"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className={styles.campaign}
            src="/uploads/campaigns/skin.jpg"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className={styles.campaign}
            src="/uploads/campaigns/phone.jpg"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className={styles.campaign}
            src="/uploads/campaigns/men.jpg"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className={styles.campaign}
            src="/uploads/campaigns/manwoman.jpg"
            fluid
          />
        </Carousel.Item>
      </Carousel>

      <div className={styles.campaigns}>
        <Image src="/uploads/campaigns/mkup.jpg" fluid />
        <Image src="/uploads/campaigns/men.jpg" fluid />
        <Image src="/uploads/campaigns/mkup.jpg" fluid />
        <Image src="/uploads/campaigns/men.jpg" fluid />
        <Image src="/uploads/campaigns/mkup.jpg" fluid />
        <Image src="/uploads/campaigns/men.jpg" fluid />
      </div>
    </>
  );
};

export default Campaigns;
