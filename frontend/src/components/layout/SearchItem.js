import React from "react";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styles from "./css/search.module.css";
const SearchItem = ({ item }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <ListGroup.Item style={{ padding: "0" }}>
        <Row>
          <Col xs={3}>
            <Link to={`/products/${item._id}/${item.name}`}>
              <Image
                className={styles.itemImage}
                src={item.image}
                alt={item.name}
                fluid
                rounded
              />
            </Link>
          </Col>
          <Col xs={9}>
            <Link to={`/products/${item._id}/${item.name}`}>
              <div>
                <h5 style={{ paddingTop: "15px" }}>{item.name}</h5>
                <h6>{`${item.category}, ${item.brand}`}</h6>
                {item.description.substring(0, 130)}....
                <Rating
                  value={item.rating}
                  text={`${item.numReviews} reviews`}
                />
                <h5
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  GH₵ {item.price}
                </h5>
              </div>
            </Link>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
};

export default SearchItem;
