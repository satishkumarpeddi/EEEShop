import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "IN",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate order processing
    setTimeout(() => {
      setOrderSuccess(true);
      clearCart();

      // Redirect to homepage after success
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Order Successfully Placed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>
          <p className="text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  >
                    <option value="US">India</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                Payment Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expMonth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Month
                  </label>
                  <input
                    type="text"
                    id="expMonth"
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    placeholder="MM"
                    maxLength={2}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expYear"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Year
                  </label>
                  <input
                    type="text"
                    id="expYear"
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                    placeholder="YY"
                    maxLength={2}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="XXX"
                    maxLength={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-3 border-b">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-10 max-w-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    ₹
                    {(
                      item.price *
                      (1 - item.discount / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
