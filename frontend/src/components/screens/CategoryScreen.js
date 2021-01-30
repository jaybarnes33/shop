import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import Product from "../layout/Product";
import Loader from "../layout/Loader";

import Message from "../layout/Message";
import Banner from "../layout/Banner";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
import Heading from "../layout/CategoryHeading";

const CategoryScreen = ({ match }) => {
  const category = match.params.category.replace(/-/g, " ");
  console.log(category);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const items = products.filter((product) =>
    product.category.toLowerCase().includes(category)
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {category === "latest products" && (
              <div className={styles.category}>
                <Heading title={category} />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {products.reverse().map((product) => (
                      <div className={styles.flexItem} key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            )}
            {items && items.length !== 0 && (
              <div className={styles.category}>
                <Heading title={category} />
                <div className={styles.categoryList}>
                  <section className={styles.categoryItems}>
                    {items.reverse().map((product) => (
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

export default CategoryScreen;
