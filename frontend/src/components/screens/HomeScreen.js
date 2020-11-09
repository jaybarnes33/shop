import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Product from "../layout/Product";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Banner from "../layout/Banner";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const electronics = products.filter(
    (product) =>
      product.category === "Electronics" &&
      product.image !== "/images/sample.jpg"
  );

  const womenFashion = products.filter(
    (product) =>
      product.category === "Women's Fashion" &&
      product.image !== "/images/sample.jpg"
  );

  const kidFashion = products.filter(
    (product) =>
      product.category === "Kid's Fashion" &&
      product.image !== "/images/sample.jpg"
  );

  const latest = products.filter(
    (product) => product.image !== "/images/sample.jpg"
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <Banner src="./images/bg2mobi.jpg" />
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className={styles.latest}>
              <p className={styles.heading}>New Products</p>
              <Container className={styles.productList}>
                <section className={styles.latestProducts}>
                  {latest.map((product) => (
                    <div className={styles.flexItem} key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </section>
              </Container>
            </div>
            {electronics.length !== 0 && (
              <div className={styles.category}>
                <p className={styles.heading}>Electronics</p>
                <Container className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {electronics.map((product) => (
                      <div className={styles.flexItem} key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </section>
                </Container>
              </div>
            )}

            {womenFashion.length !== 0 && (
              <div className={(styles.category, styles.womenFashion)}>
                <p className={styles.heading}>Women's Fashion</p>
                <Container className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {womenFashion.map((product) => (
                      <div className={styles.flexItem} key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </section>
                </Container>
              </div>
            )}

            {kidFashion.length !== 0 && (
              <div className={(styles.category, styles.kidFashion)}>
                <p className={styles.heading}>Kids's Fashion</p>
                <Container className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {kidFashion.map((product) => (
                      <div className={styles.flexItem} key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </section>
                </Container>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
