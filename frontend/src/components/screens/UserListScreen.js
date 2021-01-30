import React, { useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import { getUsers, deleteUser } from "../../actions/user";
import { USER_LIST_RESET } from "../../constants/user";
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      dispatch({ type: USER_LIST_RESET });
      history.push("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <Container>
      <Helmet>
        <title>Admin | Users</title>
       
      </Helmet>
      <h1 className="my-3">Users</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.createdAt}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;
