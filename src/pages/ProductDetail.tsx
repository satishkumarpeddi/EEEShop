import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/products";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Find product by id
    const foundProduct = allProducts.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
    } else {
      // Handle product not found
      navigate("/404");
    }

    setLoading(false);
  }, [id, navigate]);

  // Check if product is already in cart
  useEffect(() => {
    if (product) {
      const inCart = cart.some((item) => item.id === product.id);
      setAddedToCart(inCart);
    }
  }, [cart, product]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);

      // Reset animation after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Calculate discounted price
  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6"
      >
        <ChevronLeft size={20} className="mr-1" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg mb-4 p-8 flex items-center justify-center">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[product.image, ...Array(3).fill(product.image)].map(
              (img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`bg-gray-100 rounded-md p-2 flex items-center justify-center border-2 ${
                    mainImage === img ? "border-black" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="max-h-16 object-contain"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <p className="text-gray-500 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold mr-2">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-gray-500 line-through mr-2">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="bg-black text-white text-sm px-2 py-1">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 flex items-center">
                <CheckCircle size={16} className="mr-1" /> In stock
              </p>
            </div>

            <div className="border-t border-b py-6 mb-6">
              <h3 className="font-medium mb-4">Key Specifications</h3>
              <ul className="space-y-2">
                {product.specs?.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-gray-200 h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 font-medium">
                  Quantity:
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-12 h-8 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center px-6 py-3 rounded-md font-medium w-full sm:w-auto ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  } transition-colors`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle size={20} className="mr-2" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-12 pt-12 border-t">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              <span className="ml-2 text-lg font-medium">
                {product.rating} out of 5
              </span>
            </div>
            <span className="text-gray-600">
              Based on {product.reviewCount} reviews
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <div>
                  <h4 className="font-medium">Customer {i + 1}</h4>
                  <div className="flex items-center mt-1">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <Star
                          key={j}
                          size={16}
                          className={`${
                            j < 5 - i
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * i * 7
                  ).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">
                {
                  [
                    "This product exceeded my expectations. The quality is outstanding and it looks even better in person. Would definitely recommend!",
                    "Great product for the price. It works perfectly and the customer service was excellent when I had questions about the features.",
                    "Solid performance and good value. The delivery was quick and everything was well-packaged.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="border border-black px-6 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-colors">
            View All Reviews
          </button>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-12 pt-12 border-t">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {allProducts
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <a href={`/products/${relatedProduct.id}`} className="block">
                  <div className="bg-gray-100 p-4 flex items-center justify-center h-48">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="max-h-40 object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-800 font-medium">
                      ₹{relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
