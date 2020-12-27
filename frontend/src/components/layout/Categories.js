import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Dropdown, Button, ButtonGroup } from "react-bootstrap";

import { listProducts } from "../../actions/product";

import styles from "./css/banner.module.css";

const Categories = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Card className={`${styles.categories} desktop-only`}>
      <ul>
        <li>
          {" "}
          <i className="fa fa-plug"></i> Electronics
        </li>
        <li>
          {" "}
          <i className="fa fa-mobile-alt"></i> Phones & Accessories
        </li>
        <li>
          <i className="fa fa-book"></i> Books & Stationnery
        </li>
        <li>
          <i className="fa fa-ice-cream"></i> Foods & Beverages
        </li>
        <li>
          {" "}
          <i className="fa fa-book"></i> Skin Care
        </li>
        <li>
          {" "}
          <i className="fa fa-glasses"></i> Fashion & Lifestyle
        </li>
        <li>
          {" "}
          <i className="fa fa-desktop"></i> Computing
        </li>
      </ul>
    </Card>
  );
};

export default Categories;
