import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ArrowLeft, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    taxFee,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useStore();

  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Checkout Form States
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Simulate placing the order
    // 1. We create local transaction log or mock orders in localStorage for orders history
    const mockOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      })),
      subtotal: cartSubtotal,
      tax: taxFee,
      shipping: shippingFee,
      total: cartTotal,
      shippingAddress: shippingAddress,
      status: 'Processing'
    };

    // Save order details to local storage so the user can see them in /orders!
    const existingOrders = JSON.parse(localStorage.getItem('shopai_orders') || '[]');
    localStorage.setItem('shopai_orders', JSON.stringify([mockOrder, ...existingOrders]));

    // Clear cart and redirect
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="inline-flex p-4 bg-slate-100 rounded-full dark:bg-slate-900 text-slate-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-500">
          Looks like you haven't added any products to your cart yet. Check out our catalog to find premium products!
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-650 hover:bg-indigo-755 text-white px-6 py-3 rounded font-semibold text-sm transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isCheckingOut ? 'Checkout Secure' : 'Shopping Cart'}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {isCheckingOut ? 'Enter shipping credentials to finalize your order.' : 'Manage items and proceed to simulated secure checkout.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Cart Items or Checkout Address */}
        <div className="lg:col-span-2 space-y-4">
          {!isCheckingOut ? (
            /* Cart Items List */
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 gap-4"
                >
                  {/* Product Details thumbnail */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600">
                        <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Category: {item.product.category}
                      </p>
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.selectedColor && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controller & Price Action */}
                  <div className="flex sm:flex-row flex-row-reverse sm:items-center items-end justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block sm:hidden mb-0.5">Price:</span>
                      <span className="font-bold text-slate-800 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400 block">
                          (${item.product.price.toFixed(2)} each)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-850">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-slate-500 hover:text-indigo-650 disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 dark:text-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-indigo-650"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-slate-400 hover:text-red-500 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Checkout Form (Shipping & Payment) */
            <form onSubmit={handlePlaceOrder} className="border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-900 space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
                  1. Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Address Line</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.addressLine}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine: e.target.value })}
                      placeholder="123 Science Way"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="Boston"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        placeholder="02115"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Country</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        placeholder="USA"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
                  2. Payment Simulation (Sandbox)
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">CVV</label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-sm dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 border border-slate-350 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-850 dark:text-slate-300 py-3 rounded text-sm font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Edit Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white py-3 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4.5 w-4.5" />
                  Simulate Purchase
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="lg:col-span-1 border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900 h-fit space-y-6">
          <h2 className="font-bold text-sm text-slate-800 dark:text-slate-200 pb-4 border-b border-slate-100 dark:border-slate-800">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800 dark:text-white">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping Fee</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-green-600 uppercase text-[10px]">Free</span>
              ) : (
                <span className="font-bold text-slate-800 dark:text-white">${shippingFee.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Sales Tax (8%)</span>
              <span className="font-bold text-slate-800 dark:text-white">${taxFee.toFixed(2)}</span>
            </div>
            <hr className="border-slate-100 dark:border-slate-800 my-1" />
            <div className="flex justify-between text-base font-extrabold">
              <span>Total Price</span>
              <span className="text-indigo-600 dark:text-indigo-400">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {!isCheckingOut ? (
            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full bg-indigo-605 hover:bg-indigo-700 text-white py-3 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <CreditCard className="h-4.5 w-4.5" />
              Proceed to Checkout
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 bg-slate-50 dark:bg-slate-950 p-3 rounded">
              🔒 256-bit Sandbox Encryption Active
            </div>
          )}

          <div className="text-center">
            <Link
              to="/products"
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
