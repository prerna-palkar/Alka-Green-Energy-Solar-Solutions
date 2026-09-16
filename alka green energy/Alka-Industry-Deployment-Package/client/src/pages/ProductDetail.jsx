import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts, getRecommendations } from '../services/api';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import { Star, ShoppingCart, ChevronLeft, Minus, Plus, AlertCircle, Cpu } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recsLoading, setRecsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selector states
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);

        const data = await getProductById(id);
        setProduct(data);

        // Pre-select first color/size
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Fetch related products
        const relatedData = await getRelatedProducts(data.id, data.category);
        setRelated(relatedData);

      } catch (err) {
        console.error('Error loading product details:', err);
        setError(err.message || 'Product could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDetailRecommendations = async () => {
      try {
        setRecsLoading(true);
        // Call recommendations placeholder with active product ID
        const recs = await getRecommendations('guest_user_1', id);
        setRecommendations(recs);
      } catch (err) {
        console.error('Error loading product details recommendations:', err);
      } finally {
        setRecsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
      fetchDetailRecommendations();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedColor, selectedSize);

    // Custom premium toast feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-slate-900 text-white text-sm px-4 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-slide-in';
    toast.innerHTML = `<span class="text-green-400">✓</span> Added <strong>${quantity}x ${product.name}</strong> (${selectedColor || 'N/A'}, ${selectedSize || 'N/A'}) to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse py-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-lg aspect-square"></div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-12 max-w-md mx-auto text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Unable to Display Product</h2>
        <p className="text-sm text-slate-500">{error || 'The product you requested does not exist.'}</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-1.5 bg-indigo-650 hover:bg-indigo-750 text-white px-4 py-2 rounded text-xs font-semibold"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      
      {/* Back Button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>

      {/* Main Detail Columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Product Image */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-video md:aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Info Panels */}
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-650 dark:text-indigo-400">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-350 dark:text-slate-700'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-550 dark:text-slate-400">
              {product.rating} ({product.reviewCount} customer reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Configuration Selection */}
          <div className="space-y-4">
            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Color</span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 border rounded text-xs font-medium transition-all ${selectedColor === c ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'border-slate-300 dark:border-slate-700 text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Size</span>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 border rounded text-xs font-medium transition-all ${selectedSize === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'border-slate-300 dark:border-slate-700 text-slate-750 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controller & Add Button */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Quantity</span>
              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-slate-350 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-slate-500 hover:text-indigo-650 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800 dark:text-white select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-slate-500 hover:text-indigo-650"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4.5 w-4.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">Specifications</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-slate-100 dark:border-slate-800 pb-1.5">
                    <dt className="text-slate-400 font-medium">{key}</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-bold">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

        </div>
      </section>

      {/* Recommended For You Section - ML Placeholder */}
      <section className="border border-slate-250 bg-slate-50 rounded-xl p-8 dark:bg-slate-900 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 text-indigo-650 rounded-lg dark:bg-indigo-950 dark:text-indigo-300">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Recommended for You</h2>
            <p className="text-slate-500 text-xs">ML-Powered Personalization Feed</p>
          </div>
        </div>

        {recsLoading ? (
          <div className="h-20 flex items-center justify-center text-sm text-slate-400">
            Loading recommendation models...
          </div>
        ) : recommendations === null ? (
          <div className="border border-dashed border-slate-350 dark:border-slate-700 rounded-lg p-6 text-center bg-white dark:bg-slate-950 space-y-2">
            <p className="text-sm font-medium text-slate-650 dark:text-slate-400">
              Personalized suggestions are currently offline.
            </p>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              This section is configured to hook up to our FastAPI recommendation endpoint. When active, it will dynamically fetch products suggested for your user profile.
            </p>
            <div className="inline-flex text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/50 px-2 py-1 rounded">
              Ready for: FastAPI GET /api/recommendations?product_id={id}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Related Products Feed */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Related Products</h2>
          <p className="text-slate-500 text-xs mt-0.5">Explore similar products in the {product.category} category.</p>
        </div>
        {related.length === 0 ? (
          <div className="text-xs text-slate-400">No related products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default ProductDetail;
