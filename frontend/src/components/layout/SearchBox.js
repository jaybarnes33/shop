import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      className="search-flex-container"
      style={{ width: "100%" }}
      onSubmit={submitHandler}
    >
      <Form.Control
        type="search"
        name="q"
        placeholder="Search for item by name, brand or category."
        onChange={(e) => setKeyword(e.target.value)}
        className=""
      ></Form.Control>
      <Button
        className="btn-warning"
        style={{
          padding: "10px",
          marginLeft: "-12px",
        }}
        type="submit"
      >
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
