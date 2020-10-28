import React from 'react';

const Rating = ({ rating, numReviews }) => {
  const isFloat = function (n) {
    return parseInt(n) !== n;
  };

  if (typeof rating !== 'number') {
    return null;
  }

  return (
    <div>
      <span>
        {/* number of full stars */}
        {[...Array(Math.floor(rating))].map((_, index) => (
          <i key={index} className="fas fa-star"></i>
        ))}

        {/* add halfstar if needed */}
        {isFloat(rating) && <i className="fas fa-star-half-alt"></i>}

        {/* remaining empty star out of 5 */}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <i key={index} className="far fa-star"></i>
        ))}
      </span>
      <span style={{ marginLeft: '0.5rem' }}>{numReviews} reviews</span>
    </div>
  );
};

export default Rating;
