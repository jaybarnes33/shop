import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../layout/FormContainer";
import CheckoutSteps from "../layout/CheckoutSteps";

import { savePaymentMethod } from "../../actions/cart";
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="py-1">Payment</h1>
      <Form onSubmit={submitHandler} className="py-4">
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              className="py-1"
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              className="py-1"
              type="radio"
              label="MTN Mobile Money"
              id="paypal"
              name="paymentMethod"
              value="MTN Momo"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              className="py-1"
              type="radio"
              label="Vodafone Cash"
              id="paypal"
              name="paymentMethod"
              value="Vodafone Cash"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="my-2" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
