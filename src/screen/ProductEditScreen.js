import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { itemAction } from '../reducers/itemReducer';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setePrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      return history.push('/login');
    }

    if (!product.name || product.id !== productId) {
      dispatch(itemAction(productId));
    } else {
      setName(product.name);
      setePrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, userInfo, history, dispatch, productId]);

  const handleEdit = (e) => e;

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleEdit}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Email"
                value={name}
                onChange={({ target }) => setName(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="price">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Price"
                value={price}
                onChange={({ target }) => setePrice(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Image url"
                value={image}
                onChange={({ target }) => setImage(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="brand">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={({ target }) => setBrand(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="countInStock">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Count in stock"
                value={countInStock}
                onChange={({ target }) => setCountInStock(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="category">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Category"
                value={category}
                onChange={({ target }) => setCategory(target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="description">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              ></FormControl>
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

export default ProductEditScreen;
