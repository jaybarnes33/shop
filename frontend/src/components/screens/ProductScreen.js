import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  ListGroup,
  Image,
  Col,
  Row,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import Rating from "../layout/Rating";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import { listProduct } from "../../actions/product";
import "./css/product.css";
const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProduct(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };
  return (
    <Container>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col lg={5} md={4}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              loading="lazy"
            />
          </Col>
          <Col lg={3} md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4 className="product-name">{product.name}</h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>{"GH₵" + product.price}</ListGroup.Item>
            <ListGroup.Item>
              {"Description: " + product.description}
            </ListGroup.Item>
          </Col>
          <Col lg={4} md={4}>
            <Card className="checkOut">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>GH₵ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    {product.countInStock > 0 ? (
                      <>
                        <Row>
                          <Col>In Stock :</Col>
                          <Col>{product.countInStock}</Col>
                        </Row>
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </strong>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity: </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          className="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn btn-block btn-dark"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
