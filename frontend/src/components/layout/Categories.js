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
      <Button className="btn-block">Categories</Button>
      <ul>
        <li>Electronics</li>
        <li>Phones & Accessories</li>
        <li>Books & Stationnery</li>
        <li>Foods</li>
        <li>Skin Care</li>
        <li>Fashion</li>
        <li>Lifestyle</li>
      </ul>
    </Card>
  );
};

export default Categories;
