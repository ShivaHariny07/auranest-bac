import React from 'react';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Building Your Skincare Routine",
    excerpt: "Learn how to create a personalized skincare routine that works for your skin type and addresses your specific concerns.",
    image: "https://images.pexels.com/photos/6621290/pexels-photo-6621290.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    category: "Skincare"
  },
  {
    id: 2,
    title: "Makeup Tips for Different Skin Tones",
    excerpt: "Discover the best makeup techniques and color choices that complement your unique skin tone for a flawless look.",
    image: "https://images.pexels.com/photos/6621025/pexels-photo-6621025.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Meera Patel",
    date: "2024-01-12",
    category: "Makeup"
  },
  {
    id: 3,
    title: "Understanding Ingredients: What to Look For",
    excerpt: "A comprehensive guide to understanding skincare ingredients and how to choose products that are right for you.",
    image: "https://images.pexels.com/photos/6621034/pexels-photo-6621034.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Dr. Rajesh Kumar",
    date: "2024-01-10",
    category: "Education"
  },
  {
    id: 4,
    title: "Seasonal Beauty: Winter Skincare Essentials",
    excerpt: "Protect your skin during the harsh winter months with these essential products and techniques.",
    image: "https://images.pexels.com/photos/6621300/pexels-photo-6621300.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Ananya Singh",
    date: "2024-01-08",
    category: "Seasonal"
  },
  {
    id: 5,
    title: "The Science Behind Anti-Aging Skincare",
    excerpt: "Explore the latest research and breakthrough ingredients that can help maintain youthful, healthy skin.",
    image: "https://images.pexels.com/photos/6621283/pexels-photo-6621283.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Dr. Kavita Menon",
    date: "2024-01-05",
    category: "Anti-Aging"
  },
  {
    id: 6,
    title: "DIY Beauty Recipes Using Natural Ingredients",
    excerpt: "Create effective beauty treatments at home using simple, natural ingredients from your kitchen.",
    image: "https://images.pexels.com/photos/6621320/pexels-photo-6621320.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Ritu Agarwal",
    date: "2024-01-03",
    category: "DIY"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-red-800 fill-current" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold ml-3 bg-gradient-to-r from-red-800 to-pink-600 bg-clip-text text-transparent">
              Aura Nest
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Beauty Blog</h1>
          <p className="text-lg text-gray-600">
            Discover the latest beauty tips, trends, and expert advice from our team of professionals.
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
                <span className="text-sm text-gray-500">{blogPosts[0].category}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{blogPosts[0].date}</span>
                </div>
              </div>
              <button className="bg-red-800 text-white px-6 py-3 rounded-md hover:bg-red-900 transition-colors duration-200 flex items-center space-x-2">
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:order-first">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-red-800 font-semibold">{post.category}</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <button className="text-red-800 hover:text-red-900 font-medium flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-red-800 text-white rounded-lg p-8 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg opacity-90 mb-8">
            Get the latest beauty tips, product reviews, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button className="bg-white text-red-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;