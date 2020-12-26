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
    <Form className="search-flex-container mx-auto" onSubmit={submitHandler}>
      <Form.Control
        type="search"
        name="q"
        placeholder="Search for item by name, brand or category."
        onChange={(e) => setKeyword(e.target.value)}
        className=""
      ></Form.Control>
      <Button
        variant="danger"
        style={{
          padding: "12px",
          marginLeft: "-15px",
        }}
        type="submit"
      >
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
