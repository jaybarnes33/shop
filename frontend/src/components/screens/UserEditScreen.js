import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import FormContainer from "../layout/FormContainer";
import { getUserDetails, updateUser } from "../../actions/user";
import { USER_UPDATE_RESET } from "../../constants/user";

const UserEditScreen = ({ match, history }) => {
  const user_id = match.params.user_id;

  const [isAdmin, setIsAdmin] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/users");
    } else {
      if (!user.name || user._id !== user_id) {
        dispatch(getUserDetails(user_id));
      } else {
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, user_id, successUpdate, history]);

  const submitHandler = (e) => {
    dispatch(updateUser({ _id: user_id, isAdmin }));
  };

  return (
    <Container>
      <Link to="/admin/users" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1 style={{ fontSize: "1.6rem", padding: "2rem 0 0.5rem 0 " }}>
            Edit User
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={user.name}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button variant="primary" onClick={submitHandler}>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default UserEditScreen;
