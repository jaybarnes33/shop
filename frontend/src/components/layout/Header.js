import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from "react-router-dom";
import {
  Image,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./css/nav.css";
import { logOut } from "../../actions/user";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      <header>
        <Navbar className="desktop-only" expand="lg" collapseOnSelect>
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
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link className="nav-link">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="icon bi bi-cart"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                    <sup>
                      <Badge pill variant="danger">
                        {cartItems.length !== 0 &&
                          cartItems.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}
                      </Badge>
                    </sup>
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {userInfo && userInfo.isAdmin && (
                      <>
                        <hr />
                        <NavDropdown.Item>Admin</NavDropdown.Item>
                        <hr />
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    <NavDropdown.Item onClick={logOutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <NavDropdown
                      title={
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="icon bi bi-person"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                          />
                        </svg>
                      }
                      id="userMenu"
                    >
                      <LinkContainer to="/signin">
                        <NavDropdown.Item>Sign In</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/register">
                        <NavDropdown.Item>Register</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Mobile Nav */}
        <Navbar className="main-nav mobile-only" collapseOnSelect>
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
              <Nav className="ml-4">
                {userInfo ? (
                  <NavDropdown
                    title={
                      <>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="icon bi bi-person"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                          />
                        </svg>
                        <sup>
                          <Badge>
                            <i
                              style={{ color: "green" }}
                              className="fas fa-circle"
                            ></i>
                          </Badge>
                        </sup>
                      </>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>{userInfo.name}</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logOutHandler}>
                      Logout
                    </NavDropdown.Item>

                    {userInfo && userInfo.isAdmin && (
                      <>
                        <hr />
                        <NavDropdown.Item>Admin</NavDropdown.Item>
                        <hr />
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                  </NavDropdown>
                ) : (
                  <>
                    <NavDropdown
                      title={
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="icon bi bi-person"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                          />
                        </svg>
                      }
                      id="userMenu"
                    >
                      <LinkContainer to="/signin">
                        <NavDropdown.Item>Sign In</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/register">
                        <NavDropdown.Item>Register</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </>
                )}
                <LinkContainer to="/cart">
                  <Nav.Link className="nav-link ml-4">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="icon bi bi-cart"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                    <sup>
                      <Badge pill variant="danger">
                        {cartItems.length !== 0 &&
                          cartItems.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}
                      </Badge>
                    </sup>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Nav className="mobile-only">
          <Container>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Container>
        </Nav>
      </header>
    </>
  );
};

export default Header;
