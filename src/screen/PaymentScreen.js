import React, { useState } from 'react';

import {
  Col,
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckOutSteps';
import { savePaymentMethod } from '../reducers/cartReducer';

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  // if no shipping address then redirect
  if (!shippingAddress) history.push('/shipping');

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmitPayment}>
        <FormGroup>
          <FormLabel as="legend">Select Method</FormLabel>

          <Col>
            <FormCheck
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={({ target }) => setPaymentMethod(target.value)}
            ></FormCheck>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
