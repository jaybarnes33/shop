import React from "react";
import { Image } from "react-bootstrap";
import styles from "./css/banner.module.css";
const Banner = (props) => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <>
          Welcome to Atrady, <br />
          <span>Find all you need here.</span>
        </>
      </div>
    </div>
  );
};

export default Banner;
