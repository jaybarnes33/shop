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
    <Form style={{ width: "100%" }} onSubmit={submitHandler} inline>
      <Form.Control
        style={{ width: "80%" }}
        type="search"
        name="q"
        placeholder="Search for item by name"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        className="btn-danger"
        style={{ width: "40px", padding: "10px", marginLeft: "-10px" }}
        type="submit"
      >
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
