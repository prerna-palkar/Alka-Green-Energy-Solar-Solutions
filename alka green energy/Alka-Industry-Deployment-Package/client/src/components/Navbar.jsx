import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { Search, ShoppingCart, User, ShieldAlert, LogIn, Moon, Sun, Menu, X, ClipboardList } from 'lucide-react';

const Navbar = () => {
  const { cartItemCount, darkMode, toggleTheme } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Shop', path: '/products', icon: null },
    { name: 'Orders', path: '/orders', icon: ClipboardList },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Admin', path: '/admin', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo / Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              <span className="font-extrabold lowercase mr-0.5">beautiful</span>
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 px-2 py-0.5 rounded text-sm font-semibold tracking-wider lowercase">soup</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          </form>

          {/* Desktop Navigation Links & Controls */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              Shop
            </Link>
            <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              Orders
            </Link>
            <Link to="/profile" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              Profile
            </Link>
            <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              Admin
            </Link>
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </nav>

          {/* Quick Buttons: Cart, Theme Toggle, Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center min-w-4.5 h-4.5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full transform translate-x-1 -translate-y-1">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search & Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-all p-4 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-md text-sm outline-none focus:border-indigo-500 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          </form>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-2">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              Shop
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              Orders
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              Profile
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              Admin Dashboard
            </Link>
            <hr className="border-slate-200 dark:border-slate-800 my-1" />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 flex items-center gap-2"
            >
              <LogIn className="h-5 w-5 text-slate-400" />
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
