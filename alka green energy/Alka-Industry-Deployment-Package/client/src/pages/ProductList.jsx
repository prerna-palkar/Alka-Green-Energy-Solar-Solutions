import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read search & category query parameters from the URL
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  // Local state for filters to be applied
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [priceRange, setPriceRange] = useState([0, 300]); // Catalog goes up to 250 in mock data
  const [sortBy, setSortBy] = useState('featured');
  const [tempSearch, setTempSearch] = useState(searchQuery);

  // Sync state if search params in URL change
  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    setTempSearch(searchQuery);
  }, [searchQuery]);

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({
          search: searchQuery,
          category: selectedCategory,
          priceRange: priceRange,
          sortBy: sortBy
        });
        setProducts(data);
      } catch (err) {
        console.error('Error loading products list:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      if (tempSearch.trim()) {
        prev.set('search', tempSearch.trim());
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchParams((prev) => {
      if (category) {
        prev.set('category', category);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 300]);
    setSortBy('featured');
    setTempSearch('');
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Shop Catalog</h1>
        <p className="text-slate-500 text-sm mt-0.5">Browse all available items, refine with filters, or search.</p>
      </div>

      {/* Main Catalog Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6 border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900 h-fit">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold flex items-center gap-1.5 text-sm text-slate-800 dark:text-slate-200">
              <SlidersHorizontal className="h-4.5 w-4.5" />
              Filter Tools
            </h2>
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-0.5"
            >
              Clear All
            </button>
          </div>

          {/* Search Sub-form */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Search</label>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                placeholder="Keywords..."
                className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs focus:border-indigo-500 dark:text-white outline-none"
              />
              <button
                type="submit"
                className="bg-slate-850 hover:bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
              >
                Go
              </button>
            </form>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400">Category</label>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleCategorySelect('')}
                className={`text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${!selectedCategory ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'}`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400">
              <span>Max Price</span>
              <span className="text-indigo-650 dark:text-indigo-400">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold pt-1">
              <span>$0</span>
              <span>$150</span>
              <span>$300</span>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-455 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              Sorting
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-800 dark:text-slate-200 focus:border-indigo-500 outline-none"
            >
              <option value="featured">Featured / Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Product Grid Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active filter badges */}
          {(searchQuery || selectedCategory || priceRange[1] < 300) && (
            <div className="flex flex-wrap items-center gap-2 bg-slate-100/60 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800/40">
              <span className="text-xs text-slate-500 font-semibold uppercase mr-1">Active:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-700 dark:bg-slate-850 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-full px-2.5 py-0.5 text-xs">
                  "{searchQuery}"
                  <button onClick={() => setSearchParams((prev) => { prev.delete('search'); return prev; })} className="text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-700 dark:bg-slate-850 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-full px-2.5 py-0.5 text-xs">
                  {selectedCategory}
                  <button onClick={() => handleCategorySelect('')} className="text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                </span>
              )}
              {priceRange[1] < 300 && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-700 dark:bg-slate-850 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-full px-2.5 py-0.5 text-xs">
                  &lt; ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 300])} className="text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Loaders / Errors / Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 animate-pulse">
                  <div className="bg-slate-250 dark:bg-slate-800 aspect-square rounded-md"></div>
                  <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 font-medium">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center text-slate-500 bg-white dark:bg-slate-900 space-y-2">
              <p className="font-bold text-base text-slate-750 dark:text-slate-300">No matching products found</p>
              <p className="text-xs max-w-sm mx-auto">Try clearing search parameters or widening your pricing filters to see items.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-flex bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-xs font-semibold tracking-wide transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProductList;
