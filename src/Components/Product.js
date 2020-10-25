import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div" className="my-3">
          {product.rating} from {product.numReviews} reviews
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.exact({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    countInStock: PropTypes.number,
    rating: PropTypes.number,
    numReviews: PropTypes.number,
  }).isRequired,
};

export default Product;
