import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { featuredProducts } from "../data/products";

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              The Future of Tech is Here
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Discover the latest electronics and cutting-edge technology at
              unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-black px-6 py-3 rounded-md font-medium transition-transform hover:scale-105"
            >
              Shop Now <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Smartphones", "Laptops", "Headphones", "Accessories"].map(
              (category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="group"
                >
                  <div className="bg-gray-100 rounded-lg p-6 text-center transition-all duration-300 group-hover:shadow-lg group-hover:bg-gray-200">
                    <h3 className="text-xl font-medium">{category}</h3>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-gray-800"
            >
              View All Products <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
