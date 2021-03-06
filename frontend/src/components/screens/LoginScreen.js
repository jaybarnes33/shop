import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import FormContainer from "../layout/FormContainer";
import { login } from "../../actions/user";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return loading ? (
    <Loader />
  ) : (
    <FormContainer>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="" style={{ fontSize: "1.5rem", margin: "1.5rem 0" }}>
        Sign In
      </h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>New Customer?</Col>{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
