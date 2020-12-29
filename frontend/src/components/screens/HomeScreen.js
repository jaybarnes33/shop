import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import Product from "../layout/Product";
import Loader from "../layout/Loader";

import Message from "../layout/Message";
import Banner from "../layout/Banner";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
import Heading from "../layout/Heading";

const HomeScreen = ({ match }) => {
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

  const menFashion = products.filter(
    (product) =>
      product.category === "Men's Fashion" &&
      product.image !== "/images/sample.jpg"
  );

  const kidFashion = products.filter(
    (product) =>
      product.category === "Kid's Fashion" &&
      product.image !== "/images/sample.jpg"
  );

  const phonesEtc = products.filter(
    (product) =>
      product.category === "Phones & Accessories" &&
      product.image !== "/images/sample.jpg"
  );
  const latest = products.filter(
    (product) => product.image !== "/images/sample.jpg"
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {<Banner src="./images/bg2mobi.jpg" />}
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {latest && latest.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Latest Products" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {latest
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
            {electronics && electronics.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Electronics" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {electronics
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
            {kidFashion && kidFashion.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Kid's Fashion" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {kidFashion
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
            {womenFashion && womenFashion.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Women's Fashion" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {womenFashion
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
            {menFashion && menFashion.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Men's Fashion" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {menFashion
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}

            {phonesEtc && phonesEtc.length !== 0 && (
              <div className={styles.category}>
                <Heading title="Phone's & Accessories" />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {phonesEtc
                      .reverse()
                      .slice(0, 6)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
