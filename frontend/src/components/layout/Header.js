import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Image, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./css/nav.css";
import { logOut } from "../../actions/user";

const Header = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  const loggedUser = useSelector((state) => state.userLogin);
  const { userInfo } = loggedUser;

  return (
    <Navbar expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image className="logo" src="/logo(1).png" alt="" rounded />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          className="form-control"
          style={{ maxWidth: "50px" }}
          aria-controls="basic-navbar-nav"
        >
          {" "}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-filter-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"
            />
          </svg>
        </Navbar.Toggle>{" "}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="icon fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logOutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/signin">
                <Nav.Link>
                  <i className="icon fa fa-user"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminMenu">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
