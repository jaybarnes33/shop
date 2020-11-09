import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import FormContainer from "../layout/FormContainer";
import { listProduct, updateProduct } from "../../actions/product";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/product";

const ProductEditScreen = ({ match, history }) => {
  const product_id = match.params.product_id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/products");
    } else {
      if (!product || product._id !== product_id) {
        dispatch(listProduct(product_id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, product_id, successUpdate]);

  const submitHandler = (e) => {
    dispatch(
      updateProduct({
        _id: product_id,
        name,
        price,
        brand,
        image,
        countInStock,
        category,
        description,
      })
    );
  };

  return (
    <Container>
      <Link to="/admin/products" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {successUpdate && <Message variant="success">Product Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1 style={{ fontSize: "1.6rem", padding: "2rem 0 0.5rem 0 " }}>
            Edit Product
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeHolder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                placeHolder="Enter Brand"
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeHolder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;
