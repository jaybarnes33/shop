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
import Loader from "../layout/Loader";
import styles from "../../misc.module.css";

import { getOrder } from "../../actions/order";

const OrderScreen = ({ match }) => {
  const order_id = match.params.order_id;
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    shippingPrice,
    itemsPrice,
    taxPrice,
    totalPrice,
    user,
  } = order;
  useEffect(() => {
    dispatch(getOrder(order_id));
  }, [dispatch, order_id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <Row>
        <h2 className="py-3">Order {order._id}</h2>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Buyer info</h2>
              <p>
                <strong className={styles.bold}>Name: </strong> {user.name}
                <br />
                <strong className={styles.bold}>Email: </strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
                <br />
                <strong className={styles.bold}>Tel: </strong>
                {shippingAddress.phone}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong className={styles.bold}>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.region}, <br />
              {order.isDelivered ? (
                <Message>{` Delivered on ${order.deliveredAt}`}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <strong className={styles.bold}>Method: </strong>
              {paymentMethod}
              {order.isPaid ? (
                <Message>{` Paid on ${order.paidAt}`}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order(s)</h2>
              {orderItems.length === 0 ? (
                <Message>Your order is enpty</Message>
              ) : (
                <ListGroup>
                  {orderItems.map((item, index) => (
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
                  <Col>GH₵{addDecimals(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>GH₵{addDecimals(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>GH₵{addDecimals(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className={styles.bold}>Total</Col>
                  <Col className={styles.bold}>
                    GH₵{addDecimals(totalPrice)}
                  </Col>
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
                disabled={orderItems.length === 0}
              >
                Pay with {paymentMethod}
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
