import React, { useState } from "react";
import { Form } from "react-bootstrap";
const QuantitySelector = ({ stock, onChange, value: quantity }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const addToQuantity = () => {
    if (quantity < stock) {
      let value = quantity + 1;
      onChange(value);
    }
  };
  const subtractFromQuantity = () => {
    if (quantity > 1) {
      let value = quantity - 1;
      onChange(value);
    }
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <i
        onClick={addToQuantity}
        style={{ marginRight: "10px" }}
        className="sign fa fa-plus"
      ></i>
      <Form.Control value={quantity} onChange={handleChange}></Form.Control>
      <i
        onClick={subtractFromQuantity}
        style={{ marginLeft: "10px" }}
        className="sign fa fa-minus"
      ></i>
    </div>
  );
};

export default QuantitySelector;
