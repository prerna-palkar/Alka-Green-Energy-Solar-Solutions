import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first color and size if available, otherwise empty string
    const color = product.colors && product.colors.length > 0 ? product.colors[0] : '';
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : '';
    addToCart(product, 1, color, size);
    
    // Custom premium toast feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-slate-900 text-white text-sm px-4 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-slide-in';
    toast.innerHTML = `<span class="text-green-400">✓</span> Added <strong>${product.name}</strong> to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full">
      {/* Product Image Link */}
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden aspect-video sm:aspect-square bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category Badge */}
        <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded backdrop-blur-sm">
          {product.category}
        </span>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
          {product.category}
        </span>

        <h3 className="text-sm font-semibold text-slate-850 dark:text-slate-150 hover:text-indigo-650 line-clamp-2 min-h-10 flex-1">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="text-base font-bold text-slate-900 dark:text-white pt-1">
          ${product.price.toFixed(2)}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center gap-1.5 border border-slate-350 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 px-3 py-2 rounded text-xs font-semibold tracking-wide transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-xs font-semibold tracking-wide transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
