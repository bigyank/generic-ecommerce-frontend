import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../Components/Rating';
import { getItem } from '../services/products';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    const retriveItem = async () => {
      const data = await getItem(id);
      setProduct(data);
    };

    retriveItem();
  }, [id]);

  if (!product) return null;

  return (
    <>
      <LinkContainer to="/">
        <Button variant="light" className="my-3">
          Back
        </Button>
      </LinkContainer>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: ${product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </ListGroupItem>
            <ListGroupItem>Price: {product.price}</ListGroupItem>
            <ListGroupItem>
              <Button block disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
