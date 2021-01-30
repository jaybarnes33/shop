import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Dropdown, Button, ButtonGroup } from "react-bootstrap";

import { listProducts } from "../../actions/product";

import styles from "./css/banner.module.css";
import { Link } from "react-router-dom";

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
          <Link to="/products/categories/electronics">
            <i className="fa fa-plug"></i> Electronics
          </Link>
        </li>
        <li>
          <Link to="/products/categories/phones&accessories">
            <i className="fa fa-mobile-alt"></i> Phones & Accessories
          </Link>
        </li>
        <li>
          <Link to="/products/categories/books&stationnery">
            <i className="fa fa-book"></i> Books & Stationnery
          </Link>
        </li>
        <li>
          <Link to="/products/categories/foods&beverages">
            <i className="fa fa-ice-cream"></i> Foods & Beverages
          </Link>
        </li>
        {/* <li>
          {" "}
          <i className="fa fa-bottle"></i> Skin Care
        </li> */}
        <li>
          <Link to="/products/categories/fashion">
            <i className="fa fa-glasses"></i> Fashion & Lifestyle
          </Link>
        </li>
        <li>
          <Link to="/products/categories/computing">
            <i className="fa fa-desktop"></i> Computing
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default Categories;
