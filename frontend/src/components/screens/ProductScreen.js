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
import Product from "../layout/Product";
import QuantitySelector from "../layout/QuantitySelector";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/product";
import { listProduct, createReview, listProducts } from "../../actions/product";

import styles from "./css/product.module.css";

import { addToCart } from "../../actions/cart";

const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  //
  const handleChange = (value) => {
    setQuantity(Number(value));
  };
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProduct(match.params.id));
    dispatch(listProducts());
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };
  const sameCategory = products.filter(
    (item) => item.category === product.category && item._id !== product._id
  );

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
        <>
          <Row>
            <Col
              lg={5}
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fluid
                loading="lazy"
                style={{ minHeight: "300px", maxHeight: "300px" }}
              />
            </Col>
            <Col lg={3} md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4 className={styles.productName}>{product.name}</h4>
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
              <Card>
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
                          <QuantitySelector
                            stock={product.countInStock}
                            value={quantity}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {String(product.category)
                    .toLowerCase()
                    .includes("fashion") && (
                    <ListGroup.Item>Size:</ListGroup.Item>
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
          {sameCategory.length !== 0 && (
            <>
              <div className={styles.sameCategory}>
                <p className={styles.heading}>Also in this category</p>
                <div className={styles.categoryContainer}>
                  <section className={styles.categoryItems}>
                    {sameCategory.slice(0, 6).map((product) => (
                      <div className={styles.flexItem} key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </>
          )}

          <Row>
            <Col md={6}>
              <>
                <h2 className="my-2">Reviews</h2>
                {product.reviews.length === 0 && (
                  <Message>No reviews yet</Message>
                )}

                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong style={{ fontWeight: "bold" }}>
                        {review.name}
                      </strong>
                      <Rating value={review.rating} />
                      <p style={{ fontWeight: "bold" }}>
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2 className="my-2">Write a Review</h2>
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select ...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/signin">Sign in</Link>
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
