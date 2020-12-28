import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { addToCart } from "../../actions/cart";
const QuantitySelector = ({ id, stock, onChange, quantity }) => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1);

  const handleChange = (qty) => {
    // setQuantity(Number(qty));
    onChange(Number(quantity));
    dispatch(addToCart(id, Number(qty)));
  };
  const addToQuantity = () => {
    if (quantity < stock) {
      handleChange(Number(quantity) + 1);
    }
  };
  const subtractFromQuantity = () => {
    if (quantity > 1) {
      handleChange(Number(quantity) - 1);
    }
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <i
        onClick={addToQuantity}
        style={{ marginRight: "10px" }}
        className="sign fa fa-plus"
      ></i>
      <Form.Control
        value={Number(quantity)}
        style={{ padding: "10px" }}
        onChange={handleChange}
      ></Form.Control>
      <i
        onClick={subtractFromQuantity}
        style={{ marginLeft: "10px" }}
        className="sign fa fa-minus"
      ></i>
    </div>
  );
};

export default QuantitySelector;
