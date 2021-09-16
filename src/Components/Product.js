import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
function Product({ product }) {
  return (
    <div className="effect-2 m-auto">
      <Link
        to={`/product/${product._id}/`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="effect-img">
          <Image
            src={`https://api.cocobeauty.ir${product.image}`}
            className=""
            fluid
            alt={product.name}
          />
        </div>
        <div className="effect-text">
          <h2>{product.name}</h2>

          <div className="effect-btn"></div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
