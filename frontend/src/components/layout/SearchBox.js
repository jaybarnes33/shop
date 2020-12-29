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
    <Form className="form mx-auto" onSubmit={submitHandler}>
      <div className="search-flex-container mx-auto">
        <i className=" ml-2 fa fa-search"></i>
        <Form.Control
          type="search"
          name="q"
          placeholder="Search for item by name, brand or category."
          onChange={(e) => setKeyword(e.target.value)}
          className=""
        ></Form.Control>
      </div>

      <Button variant="warning" type="submit">
        {`  Search`}
      </Button>
    </Form>
  );
};

export default SearchBox;
