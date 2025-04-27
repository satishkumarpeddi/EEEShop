import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-transform hover:shadow-md hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[75%] bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <div className="absolute top-0 left-0 bg-black text-white text-sm font-medium px-2 py-1">
              {product.discount}% OFF
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 hover:text-black transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            </div>
            <div className="text-right">
              {product.discount > 0 ? (
                <>
                  <p className="text-gray-800 font-medium">
                    ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-gray-800 font-medium">
                  ₹{product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {product.rating} ★ ({product.reviewCount})
            </span>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white w-10 h-10 rounded-full transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
