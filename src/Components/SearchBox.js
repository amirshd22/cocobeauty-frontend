import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    if (e) {
      history.push(`/?keyword=${e}`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} className="flex-row d-none d-lg-flex">
      <Form.Control
        className="mr-sm-2 ml-sm-5 text-end border rounded"
        type="text"
        name="q"
        style={{ height: "30px" }}
        placeholder="...جستجو در کوکوبیوتی🔍"
        onChange={(e) => setTimeout(submitHandler(e.target.value), 2000)}
      ></Form.Control>
    </Form>
  );
}

export default SearchBox;
