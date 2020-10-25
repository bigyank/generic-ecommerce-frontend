import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating, numReviews }) => {
  const isInt = function (n) {
    return parseInt(n) === n;
  };

  return (
    <div>
      <span>
        {/* number of full stars */}
        {[...Array(Math.floor(rating))].map((_, index) => (
          <i key={index} className="fas fa-star"></i>
        ))}

        {/* add halfstar if needed */}
        {!isInt(rating) && <i className="fas fa-star-half-alt"></i>}

        {/* remaining empty star out of 5 */}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <i key={index} className="far fa-star"></i>
        ))}
      </span>
      <span style={{ marginLeft: '0.5rem' }}>{numReviews} reviews</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

export default Rating;
