import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import Loader from "../layout/Loader";
import SearchItem from "../layout/SearchItem";
import Message from "../layout/Message";
import Banner from "../layout/Banner";
import { listProducts } from "../../actions/product";

import styles from "./css/home.module.css";
const SearchScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <Container>
        <div className={styles.search}>
          <p className={`${styles.heading} my-2`}>
            {`Search Results for "${keyword}"`}{" "}
            {products.length !== 0 && `${products.length} items found`}
          </p>
          <div className={styles.searchList}>
            <section className={styles.searchItems}>
              <Container>
                {products.length === 0 &&
                  `No products matching your search "${keyword}" found`}

                {products
                  .reverse()
                  .slice(0, 8)
                  .map((product) => (
                    <SearchItem key={product._id} item={product} />
                  ))}
              </Container>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SearchScreen;
