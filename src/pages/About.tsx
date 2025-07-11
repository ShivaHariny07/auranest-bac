import React from 'react';
import { Heart, Shield, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Aura Nest</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted destination for premium beauty and skincare products. We believe that everyone deserves to feel confident and beautiful in their own skin.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a passion for authentic beauty, Aura Nest started as a small dream to make premium skincare and makeup accessible to everyone. We carefully curate products from trusted brands like Dr. Sheth's and Aqualogica, ensuring that every item meets our high standards for quality and effectiveness.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of customers who trust us with their beauty journey. From everyday essentials to special occasion glamour, we're here to help you discover products that make you feel radiant and confident.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6621477/pexels-photo-6621477.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beauty products"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-gray-600">
                We source only genuine products directly from authorized distributors and brands.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous quality checks to ensure it meets our standards.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from product curation to customer service.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in building a community of beauty enthusiasts who support each other.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-red-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            To democratize access to premium beauty and skincare products while empowering individuals to express their unique beauty. We're committed to providing authentic, high-quality products that help you look and feel your best, every day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;