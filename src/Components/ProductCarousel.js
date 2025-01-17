import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { topRatedProductAction } from '../reducers/productReducers';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(topRatedProductAction());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">error</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <CarouselItem key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
