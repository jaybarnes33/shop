import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../../misc.module.css";
const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/signin">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className={styles.disabled} disabled>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className={styles.disabled} disabled>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className={styles.disabled} disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
