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

import { usePaystackPayment } from "react-paystack";
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems, shippingAddress } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const initializePayment = usePaystackPayment({
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: Math.ceil(cart.totalPrice * 100),
    currency: "GHS",
    publicKey:
      process.env.NODE_ENV === "production"
        ? "pk_live_4f77f76738fd6becf0a144ab06fa7e614e779868"
        : "pk_test_416cb666b87d1627e714824ceb3fc4e9ff3e6acc",
  });

  const placeOrderHandler = (reference) => {
    dispatch(
      createOrder({
        user: userInfo._id,
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        transaction_id: reference.transaction,
        trxref: reference.trxref,
        status: reference.status,
      })
    );
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    placeOrderHandler(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  cart.shippingPrice =
    shippingAddress.mode === "delivery" ? addDecimals(10) : addDecimals(0);
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

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong className={styles.bold}>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},
              {shippingAddress.region} <br />
              <div style={{ textTransform: "capitalize" }}>
                <strong className={` mt-2 ${styles.bold}`}>Type: </strong>
                {shippingAddress.mode}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order(s)</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
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
                onClick={() => initializePayment(onSuccess, onClose)}
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
