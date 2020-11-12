import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { singleUserAction } from '../reducers/adminReducer';

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { error, loading, user } = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(singleUserAction(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(!!user.isAdmin);
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleLogin}>
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

            <FormGroup controlId="isAdmin">
              <FormCheck
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={({ target }) => setIsAdmin(target.checked)}
              ></FormCheck>
            </FormGroup>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
