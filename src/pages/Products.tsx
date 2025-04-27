import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Sliders, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { allProducts } from "../data/products";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get unique categories and brands from products data
  const categories = [...new Set(allProducts.map((p) => p.category))];
  const brands = [...new Set(allProducts.map((p) => p.brand))];

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const brand = searchParams.get("brand");
    const sort = searchParams.get("sort") || "featured";

    // Set selected categories
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }

    // Set selected brands
    if (brand) {
      setSelectedBrands([brand]);
    } else {
      setSelectedBrands([]);
    }

    // Set sort
    setSortBy(sort);

    // Apply filters
    let filtered = [...allProducts];

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by brand
    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    filtered = sortProducts(filtered, sort);

    setFilteredProducts(filtered);
  }, [searchParams]);

  // Apply all filters and update URL
  const applyFilters = () => {
    let params: Record<string, string> = {};

    // Add category filter
    if (selectedCategories.length === 1) {
      params.category = selectedCategories[0];
    }

    // Add brand filter
    if (selectedBrands.length === 1) {
      params.brand = selectedBrands[0];
    }

    // Add price range if it's not the default
    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      params.minPrice = priceRange[0].toString();
      params.maxPrice = priceRange[1].toString();
    }

    // Add sort parameter
    if (sortBy !== "featured") {
      params.sort = sortBy;
    }

    // Preserve search term if exists
    const search = searchParams.get("search");
    if (search) {
      params.search = search;
    }

    // Update URL
    setSearchParams(params);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSortBy("featured");

    // Preserve only search term if exists
    const search = searchParams.get("search");
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([category]); // Only allow one category at a time
    }
  };

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([brand]); // Only allow one brand at a time
    }
  };

  // Sort products function
  const sortProducts = (products: Product[], sort: string): Product[] => {
    switch (sort) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return [...products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return products; // 'featured' - no sorting, use the default order
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full py-2 bg-black text-white rounded-md"
        >
          {showFilters ? (
            <>
              <X size={18} className="mr-2" /> Hide Filters
            </>
          ) : (
            <>
              <Sliders size={18} className="mr-2" /> Show Filters
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <aside
          className={`w-full md:w-64 md:mr-8 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-black"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded text-black focus:ring-black"
                    />
                    <span className="ml-2 text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded text-black focus:ring-black"
                    />
                    <span className="ml-2 text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value === "featured") {
                    newParams.delete("sort");
                  } else {
                    newParams.set("sort", e.target.value);
                  }
                  setSearchParams(newParams);
                }}
                className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={resetFilters}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
