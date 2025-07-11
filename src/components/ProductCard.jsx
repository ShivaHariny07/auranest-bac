import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image_url,
      brand: product.brand_name || product.brands?.name || 'Unknown Brand'
    });
  };

  const discountPercentage = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-800 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-800">
            {product.brand_name || product.brands?.name || 'Unknown Brand'}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating || 0}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-red-800">₹{product.price}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors duration-200 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          {product.reviews_count || 0} reviews
        </div>
      </div>
    </div>
  );
};

export default ProductCard;