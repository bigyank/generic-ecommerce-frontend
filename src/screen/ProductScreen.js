import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../Components/Rating';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

import { itemAction } from '../reducers/itemReducer';

const ProductScreen = ({ match, history }) => {
  const { id } = match.params;

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(itemAction(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <LinkContainer to="/">
        <Button variant="light" className="my-3">
          Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
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

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row className="align-items-center">
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        as="select"
                        value={qty}
                        onChange={({ target }) => setQty(target.value)}
                      >
                        {[...Array(product.countInStock)].map(
                          (_item, index) => (
                            <option key={index + 1}>{index + 1}</option>
                          )
                        )}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  block
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;