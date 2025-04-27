import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logOut } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-black">
            EEE-Shop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-800 hover:text-black transition-colors"
            >
              Products
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-800 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="text-gray-800 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-black transition-colors">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 hover:text-black transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/cart"
              className="text-gray-800 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-black"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-2 px-4 bg-white shadow-md rounded-b-md">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="py-2 text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="py-2 text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false);
                }}
                className="py-2 text-left text-gray-800 flex items-center"
              >
                <Search size={18} className="mr-2" /> Search
              </button>
              <div className="">
                {currentUser ? (
                  <>
                    <div className="py-2 fixed  text-gray-800 border-t">
                      Signed in as:{" "}
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="py-2 text-left fixed text-gray-800"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="py-2 text-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
