import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { userDetailsAction } from '../reducers/profileReducer';
import { updateProfileAction } from '../reducers/updateProfileReducer';
import { userOrderAction } from '../reducers/orderReducer';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: ordersError, loading: ordersLoading, orders } = useSelector(
    (state) => state.userOrder
  );

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(userDetailsAction());
        dispatch(userOrderAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, history, user, dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
      return;
    }

    if (password.length === 0) return setMessage('Password must not be empty');

    dispatch(updateProfileAction({ name, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Profile updated successfully</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={handleUpdate}>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Email"
              value={name}
              onChange={({ target }) => setName(target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            ></FormControl>
          </FormGroup>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default RegisterScreen;
