import React, { useEffect } from "react";
import {
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Col,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import CheckoutSteps from "../layout/CheckoutSteps";
import styles from "../../misc.module.css";

import { createOrder } from "../../actions/order";
import { CART_RESET } from "../../constants/cart";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 15 : 0);
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(
    () => {
      if (success) {
        dispatch({ type: CART_RESET });
        history.push(`/order/${order._id}`);
      }
    }, // eslint-disable-next-line
    [history, success]
  );
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        user: userInfo._id,
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        shippingAddress: shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong className={styles.bold}>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.region}, <br />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong className={styles.bold}>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order(s)</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is enpty</Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ maxWidth: "30px" }}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = GH₵
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>GH₵{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>GH₵{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className={styles.bold}>Total</Col>
                  <Col className={styles.bold}>GH₵{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <Button
                type="button"
                className="btn btn-block"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
