import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import ProductCarousel from '../Components/ProductCarousel';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Product from '../Components/Product';
import Paginate from '../Components/Paginate';
import { productListAction } from '../reducers/productReducers';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(productListAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>
          <Message variant="danger">{error}</Message>
        </h3>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
