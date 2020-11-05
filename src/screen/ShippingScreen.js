import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckOutSteps';
import { saveShippingAddress } from '../reducers/cartReducer';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmitShipping}>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="address"
            value={address}
            required
            onChange={({ target }) => setAddress(target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="city"
            value={city}
            required
            onChange={({ target }) => setCity(target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="postal">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="postal code"
            value={postalCode}
            required
            onChange={({ target }) => setPostalCode(target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="country"
            value={country}
            required
            onChange={({ target }) => setCountry(target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
