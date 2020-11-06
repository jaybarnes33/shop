import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import "./css/product.css";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          rounded="true"
          fluid="true"
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
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
        <Card.Text as="h5">GH₵ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
