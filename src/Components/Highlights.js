import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
function Highlights({ highlight }) {
  return (
    <Link
      to={highlight.link}
      className="text-decoration-none highlightImage text-dark d-flex flex-column justify-content-center align-items-center"
    >
      <Image
        src={highlight.image}
        className="rounded w-100"
        fluid
        style={{ objectFit: "cover", height: 300 }}
        alt={highlight.name}
      />
      <p className="text-center mt-2">{highlight.name}</p>
    </Link>
  );
}

export default Highlights;
