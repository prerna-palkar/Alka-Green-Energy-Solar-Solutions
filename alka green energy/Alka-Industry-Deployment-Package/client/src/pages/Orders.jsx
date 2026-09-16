import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ShoppingCart, CheckCircle, Package } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Retrieve orders created during cart simulator
    const savedOrders = localStorage.getItem('shopai_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('shopai_orders');
    setOrders([]);
  };

  if (orders.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400">
          <ClipboardList className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">No orders yet</h2>
        <p className="text-sm text-slate-500">
          Start shopping to see your orders here. Once you complete checkout, your order history will load automatically.
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-605 hover:bg-indigo-705 text-white px-6 py-3 rounded font-semibold text-sm transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Order History</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and track your simulated purchase transactions.</p>
        </div>
        <button
          onClick={handleClearHistory}
          className="text-xs font-semibold text-red-500 hover:underline"
        >
          Clear History
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-slate-205 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm"
          >
            {/* Order Meta Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 dark:border-slate-800 pb-3 gap-2 text-xs">
              <div className="space-y-1">
                <p className="font-extrabold text-indigo-650 dark:text-indigo-400">Order ID: {order.id}</p>
                <p className="text-slate-400">Placed on: {order.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400 mr-1">Total:</span>
                  <span className="font-bold text-slate-800 dark:text-white">${order.total.toFixed(2)}</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 px-2 py-0.5 rounded font-semibold">
                  <CheckCircle className="h-3 w-3" />
                  {order.status}
                </div>
              </div>
            </div>

            {/* Items Included */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                    <p className="text-slate-400">
                      Quantity: {item.quantity} {item.color ? `| Color: ${item.color}` : ''} {item.size ? `| Size: ${item.size}` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-350">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping Summary */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded text-xs grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-100 dark:border-slate-850">
              <div>
                <p className="font-bold text-slate-500 mb-1 flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  Shipping Address
                </p>
                <p className="text-slate-800 dark:text-slate-250 font-medium">
                  {order.shippingAddress?.fullName}
                </p>
                <p className="text-slate-500 mt-0.5">
                  {order.shippingAddress?.addressLine}, {order.shippingAddress?.city},{' '}
                  {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                </p>
              </div>
              <div className="flex flex-col justify-center sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-6 text-slate-500 leading-relaxed">
                <p className="font-bold text-slate-650 dark:text-slate-400">MySQL Connection Node</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  On API call, this entry would write to `orders` and `order_items` tables with database foreign keys referencing `users`.
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Orders;
