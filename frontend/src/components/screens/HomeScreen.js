import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Product from "../layout/Product";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const electronics = products.filter(
    (product) => product.category === "Electronics"
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <p className={styles.heading}>Latest Products</p>
          <Container className={styles.productList}>
            <section className={styles.latestProducts}>
              {products.map((product) => (
                <div className={styles.flexItem} key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </section>
          </Container>
          <>
            <p className={styles.heading}>Latest in Electronics</p>
            <Container className={styles.categoryList}>
              <section className={styles.category}>
                {electronics.map((product) => (
                  <div className={styles.flexItem} key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </section>
            </Container>
          </>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
