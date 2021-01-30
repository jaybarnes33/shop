import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
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

import { deliveredOrder, getOrder, sendOrder } from "../../actions/order";
import { ORDER_DELIVERED_RESET, ORDER_SEND_RESET } from "../../constants/order";

const OrderScreen = ({ match, history }) => {
  const order_id = match.params.order_id;
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
    loading: loadingDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const orderSend = useSelector((state) => state.orderSend);
  const {
    success: successSend,
    loading: loadingSend,
    error: errorSend,
  } = orderSend;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    shippingPrice,
    itemsPrice,
    totalPrice,
    user,
  } = order;
  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      history.push("/signin");
    } else {
      if (order._id !== order_id || successDeliver || successSend) {
        dispatch({ type: ORDER_DELIVERED_RESET });
        dispatch({ type: ORDER_SEND_RESET });
        dispatch(getOrder(order_id));
      }
    }
  }, [
    dispatch,
    order_id,
    history,
    userInfo,
    order,
    successDeliver,
    successSend,
  ]);

  const deliverHandler = () => {
    dispatch(deliveredOrder(order));
  };

  const sendHandler = () => {
    dispatch(sendOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <Row>
        <h2
          style={{
            fontSize: "1.6rem",
            wordBreak: "break-all",
            wordWrap: "break-word",
          }}
          className="py-3"
        >
          Order {order._id}
        </h2>
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
              {order.isSent ? (
                <Message>{` Sent on ${order.sentAt.substring(0, 10)}`}</Message>
              ) : (
                <Message variant="danger">Not sent</Message>
              )}
              {order.isDelivered ? (
                <Message>{` Delivered on ${order.deliveredAt.substring(
                  0,
                  10
                )}`}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <strong className={styles.bold}>Method: </strong>
              {paymentMethod}
              {order.isPaid ? (
                <Message>{` Paid on ${order.paidAt.substring(0, 10)}`}</Message>
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
                  <Col className={styles.bold}>Total</Col>
                  <Col className={styles.bold}>
                    GH₵{addDecimals(totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {userInfo && order.user._id === userInfo._id && (
              <ListGroup.Item>
                {error && (
                  <ListGroup.Item>
                    <Message variant="danger">{error}</Message>
                  </ListGroup.Item>
                )}

                <Button
                  type="button"
                  className="btn btn-block"
                  disabled={
                    orderItems.length === 0 ||
                    (userInfo && userInfo._id !== order.user._id)
                  }
                >
                  Pay with {paymentMethod}
                </Button>
              </ListGroup.Item>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isSent &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button className="btn-block" onClick={sendHandler}>
                    {" "}
                    Mark as sent
                  </Button>
                </ListGroup.Item>
              )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              order.isSent &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button className="btn-block" onClick={deliverHandler}>
                    {" "}
                    Mark as delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
