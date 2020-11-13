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
import { singleUserAction, userUpdateAction } from '../reducers/adminReducer';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { error, loading, user } = useSelector((state) => state.singleUser);
  const { error: errorUpdate, loading: loadingUpdate } = useSelector(
    (state) => state.userUpdate
  );

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(singleUserAction(userId));
    } else {
      history.push('/login');
    }
  }, [userId, dispatch, history, userInfo]);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(!!user.isAdmin);
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction({ id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdate ? (
          <Loader />
        ) : errorUpdate ? (
          <Message variant="danger">{errorUpdate}</Message>
        ) : null}
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
