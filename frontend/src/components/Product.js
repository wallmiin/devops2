import React from "react";

/* REACT-BOOTSTRAP */
import { Card } from "react-bootstrap";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Rating from "./Rating";

function Product({ product }) {
  const titleClampStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Card className="my-3 p-3 rounded d-flex flex-column h-100">
      <Link to={`/product/${product._id}`} className="text-center">
        <div className="product-image-container">
          <img className="product-image" src={product.image} alt={product.name} />
        </div>
      </Link>

      <Card.Body className="d-flex flex-column flex-grow-1">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={titleClampStyle}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>

          <div>
            <Card.Text as="h3" className="mb-0">₹{product.price}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
