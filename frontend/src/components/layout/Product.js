import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import "./css/product.css";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Card className="my-4 p-3">
      <Link to={`/products/${product._id}/${product.name}`}>
        <Card.Img
          style={{
            height: "120px",
            borderRadius: "2px",
            background: "none",
            objectFit: "contain",
          }}
          src={product.image}
          variant="top"
          rounded="true"
          loading="lazy"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}/${product.name}`}>
          <Card.Title as="div">
            <strong>{product.name.substring(0, 13)}...</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text
          style={{ fontSize: "0.9rem", fontWeight: "bold", color: "black" }}
        >
          GH₵ {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
