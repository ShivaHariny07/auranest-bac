import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, SortAsc } from 'lucide-react';

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName?.toLowerCase()
  );

  const filteredProducts = categoryProducts.filter(product => {
    if (filterBy === 'all') return true;
    if (filterBy === 'dr-sheths') return product.brand === "Dr. Sheth's";
    if (filterBy === 'aqualogica') return product.brand === 'Aqualogica';
    if (filterBy === 'on-sale') return product.originalPrice && product.originalPrice > product.price;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
            {categoryName} Products
          </h1>
          <p className="text-lg text-gray-600">
            {categoryProducts.length} products found
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Brands</option>
              <option value="dr-sheths">Dr. Sheth's</option>
              <option value="aqualogica">Aqualogica</option>
              <option value="on-sale">On Sale</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <SortAsc className="h-5 w-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;