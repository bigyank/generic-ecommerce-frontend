import React, { useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../reducers/orderReducer';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <h1>Order {order.id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    Email:{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order Cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  {error && (
                    <ListGroupItem>
                      <Message variant="danger">{error}</Message>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
