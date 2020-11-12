import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../layout/FormContainer";
import CheckoutSteps from "../layout/CheckoutSteps";

import { saveShippingAddress } from "../../actions/cart";
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [region, setRegion] = useState(shippingAddress.region);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phone, region }));
    history.push("/payment");
    console.log("Submitted");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="py-3">Shipping</h1>
      <Form onSubmit={submitHandler} className="py-4">
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="region">
          <Form.Label>Region</Form.Label>
          <Form.Control
            type="text"
            placeholder="Region"
            value={region}
            required
            onChange={(e) => setRegion(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone"
            value={phone}
            maxLength={10}
            minLength={10}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
