import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import "./css/cart.css";
import { addToCart, removeFromCart } from "../../actions/cart";
import Message from "../layout/Message";
import QuantitySelector from "../layout/CartSelector";
const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleChange = (value) => {
    setQuantity(value);
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  return (
    <Container>
      <Helmet>
        <title>{"Cart"}</title>
      </Helmet>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col>
          <h3 className="cart_title">Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <Message variant="danger">
              Your cart is empty
              <Link className="mx-5" to="/">
                Go back
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row style={{ fontSize: "0.8rem" }}>
                    <Col xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    {/* <Col xs={2}>
                      <Link to={`/products/${item.product}`}>
                        {item.name.substring(0, 13)}...
                      </Link>
                    </Col> */}
                    <Col xs={3}>GH₵{addDecimals(item.price)}</Col>
                    <Col xs={4}>
                      {/* {" "}
                      <Form.Control
                        as="select"
                        className="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control> */}
                      <QuantitySelector
                        id={item.product}
                        onChange={handleChange}
                        quantity={item.quantity}
                        stock={item.stock}
                      />
                    </Col>
                    <Col xs={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup className="total" variant="flush">
            <Card>
              <ListGroup.Item>
                <p className="subtotal py-3">
                  Total
                  {" (" +
                    cartItems.reduce((acc, item) => acc + item.quantity, 0) +
                    ") "}
                  items
                  <br />
                  GH₵
                  {addDecimals(
                    cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="btn"
                  className="btn-block btn-dark"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
