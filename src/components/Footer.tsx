import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EEE-Shop</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for premium electronics and tech
              accessories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=smartphones"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=laptops"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=headphones"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Headphones
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=accessories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-300">
                  Vasireddy Venktadari College of Engineering, Nambur, Guntur
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-300">+91 77310 40947</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-300">naveenreddy123@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} EEE-Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
