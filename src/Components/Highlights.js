import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
function Highlights({ highlight }) {
  return (
    <Link
      to={highlight.link}
      className="text-decoration-none highlightImage  text-dark d-flex flex-column justify-content-center align-items-center w-75 m-auto"
      style={{ height: "100%" }}
    >
      <Image
        src={highlight.image}
        className="w-50 h-75 rounded-circle "
        fluid
        style={{ objectFit: "cover" }}
        alt={highlight.name}
      />
      <p className="text-center mt-2">{highlight.name}</p>
    </Link>
  );
}

export default Highlights;
