import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter! (Subscribed)');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center">
              <span className="font-extrabold lowercase">beautiful</span>
              <span className="bg-indigo-650 text-white px-2 py-0.5 rounded text-sm font-semibold ml-0.5 tracking-wider lowercase">soup</span>
            </Link>
            <p className="text-sm text-slate-400">
              An advanced, production-style AI-powered e-commerce platform. Shop smarter with predictions and recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Apparel" className="hover:text-white transition-colors">Apparel</Link>
              </li>
              <li>
                <Link to="/products?category=Fitness%20%26%20Outdoors" className="hover:text-white transition-colors">Fitness & Outdoors</Link>
              </li>
            </ul>
          </div>

          {/* Customer Area */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Account & Settings</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">My Profile</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">Order History</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400">
              Subscribe to get alerts about new features, model updates, and product launches.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border border-slate-700 bg-slate-800 text-white rounded text-sm placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} beautifulsoup. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">FastAPI API Docs</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
