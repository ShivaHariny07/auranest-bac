import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const categoryImages = {
  "Moisturizer": "https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Sunscreen": "https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Primer": "https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Toner": "https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Foundation": "https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Serum": "https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Cleanser": "https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Lipstick": "https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Blush": "https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=400",
  "Mascara": "https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=400"
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Beauty Categories</h1>
          <p className="text-lg text-gray-600">Explore our complete range of beauty and skincare products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={categoryImages[category as keyof typeof categoryImages]}
                  alt={category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600 text-sm">
                  Discover our premium {category.toLowerCase()} collection
                </p>
                <div className="mt-4 flex items-center text-red-800 font-medium">
                  <span>Shop Now</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;