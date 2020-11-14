import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Product from "../layout/Product";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Banner from "../layout/Banner";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
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

  const phonesEtc = products.filter(
    (product) =>
      product.category === "Phones & Accessories" &&
      product.image !== "/images/sample.jpg"
  );
  const latest = products.filter(
    (product) => product.image !== "/images/sample.jpg"
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      {!keyword && <Banner src="./images/bg2mobi.jpg" />}
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {keyword && (
              <div className={(styles.category, styles.latest)}>
                <p className={styles.heading}>
                  {`Search Results for "${keyword}"`}{" "}
                  {products.length !== 0 && `${products.length} items found`}
                </p>
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {products.length == 0 &&
                      `No products matching your search "${keyword}" found`}

                    {products
                      .reverse()
                      .slice(0, 7)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}
            {!keyword && latest && latest.length !== 0 && (
              <div className={(styles.category, styles.latest)}>
                <p className={styles.heading}>New Products</p>
                <div className={styles.productList}>
                  <section className={styles.latestProducts}>
                    {latest
                      .reverse()
                      .slice(0, 7)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}

            {!keyword && electronics && electronics.length !== 0 && (
              <div className={styles.category}>
                <p className={styles.heading}>Electronics</p>
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {electronics
                      .reverse()
                      .slice(0, 4)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}

            {!keyword && womenFashion && womenFashion.length !== 0 && (
              <div className={(styles.category, styles.womenFashion)}>
                <p className={styles.heading}>Women's Fashion</p>
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {womenFashion
                      .reverse()
                      .slice(0, 4)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}

            {!keyword && kidFashion && kidFashion.length !== 0 && (
              <div className={(styles.category, styles.kidFashion)}>
                <p className={styles.heading}>Kids's Fashion</p>
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {kidFashion
                      .reverse()
                      .slice(0, 4)
                      .map((product) => (
                        <div className={styles.flexItem} key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </section>
                </div>
              </div>
            )}

            {!keyword && phonesEtc && phonesEtc.length !== 0 && (
              <div className={(styles.category, styles.phonesEtc)}>
                <p className={styles.heading}>Phones & Accessories</p>
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {phonesEtc
                      .reverse()
                      .slice(0, 4)
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
    </>
  );
};

export default HomeScreen;
