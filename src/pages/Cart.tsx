import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (currentUser) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <ShoppingCart size={80} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md font-medium"
          >
            Continue Shopping <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Cart Items (
                  {cart.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
                <button
                  onClick={() => clearCart()}
                  className="text-gray-500 hover:text-red-600 text-sm flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y">
              {cart.map((item) => {
                const discountedPrice =
                  item.discount > 0
                    ? item.price * (1 - item.discount / 100)
                    : item.price;

                return (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center"
                  >
                    <div className="sm:w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center mr-4 mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-16 max-w-16 object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="font-medium text-black hover:text-gray-800 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center">
                      <div className="flex items-center mr-6">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <div className="font-medium">
                          ₹{(discountedPrice * item.quantity).toFixed(2)}
                        </div>
                        {item.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/products"
              className="text-black hover:text-gray-800 flex items-center"
            >
              <ArrowRight size={16} className="mr-2 transform rotate-180" />{" "}
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span> ₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span> ₹{(cartTotal * 0.1).toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span> ₹{(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Including taxes</p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-md font-medium mt-6 hover:bg-gray-800 transition-colors"
            >
              {currentUser ? "Proceed to Checkout" : "Login to Checkout"}
            </button>

            <div className="mt-6">
              <h3 className="font-medium mb-2">We Accept</h3>
              <div className="flex space-x-2">
                {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                  <div
                    key={method}
                    className="bg-gray-100 text-xs px-2 py-1 rounded"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
