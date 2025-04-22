import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';

const ProductCard = ({ product, image, price, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-soft hover:shadow-medium cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full aspect-square overflow-hidden">
        <LazyLoadImage
          src={image}
          alt={product}
          effect="blur"
          threshold={200}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          afterLoad={() => setIsLoaded(true)}
          placeholder={
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="w-12 h-12 border-t-2 border-b-2 border-primary-500 rounded-full animate-spin"></div>
            </div>
          }
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product}</h3>
        <p className="mt-1 text-primary-600 font-bold">₹{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

export default ProductCard; 