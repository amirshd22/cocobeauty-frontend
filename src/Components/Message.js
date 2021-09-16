import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} className="rounded">
      <strong>{children}</strong>
    </Alert>
  );
}

export default Message;
