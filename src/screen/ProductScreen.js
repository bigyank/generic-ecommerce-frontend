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
  Form,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../Components/Rating';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

import { itemAction } from '../reducers/itemReducer';
import { productCreateReviewAction } from '../reducers/productReducers';
import { Link } from 'react-router-dom';

const ProductScreen = ({ match, history }) => {
  const { id } = match.params;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );

  const { error: createReviewError, sucess: createReviewSucess } = useSelector(
    (state) => state.productCreateReview
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
    if (createReviewSucess) {
      setRating(0);
      setComment('');
    }
    dispatch(itemAction(id));
  }, [dispatch, id, createReviewSucess]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      productCreateReviewAction(id, {
        rating,
        comment,
      })
    );
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
        <>
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
                <ListGroupItem>
                  Description: ${product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
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

          <Row>
            <Col md={6} className="my-5">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="info">No reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroupItem key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating
                      rating={review.rating}
                      numReviews={product.numReviews}
                      userReview={true}
                    />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>

            <Col md={6} className="my-5">
              <h2>Write a Review</h2>
              <ListGroup variant="flush">
                <ListGroupItem>
                  {createReviewError && (
                    <Message variant="danger">{createReviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <FormGroup controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={({ target }) => setRating(target.value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </FormControl>
                      </FormGroup>

                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={({ target }) => setComment(target.value)}
                        ></FormControl>
                      </FormGroup>

                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
