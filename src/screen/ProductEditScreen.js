import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormFile,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { itemAction } from '../reducers/itemReducer';
import { productUpdateAction } from '../reducers/productReducers';

import { uploadFile } from '../services/fileUpload';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setePrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const {
    loading: updateLoading,
    error: updateError,
    sucess: updateSucess,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      return history.push('/login');
    }

    if (updateSucess) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      history.push('/admin/productlist');
    } else {
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
    }
  }, [product, userInfo, history, dispatch, productId, updateSucess]);

  const uploadFileHandle = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const uploadedImage = await uploadFile(formData);
      setImage(uploadedImage);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      productUpdateAction({
        id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}

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
              <FormFile
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandle}
              ></FormFile>
              {uploading && <Loader />}
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
