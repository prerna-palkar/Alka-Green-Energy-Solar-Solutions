import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Cart state: array of { product, quantity, selectedColor, selectedSize }
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('beautifulsoup_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Authentication State: Null by default. 
  // No fake logins are created. Login and Register forms will remain visual-only UI wrappers
  // that call empty placeholder handler methods.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Theme settings (dark mode / light mode)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('beautifulsoup_theme') === 'dark';
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('beautifulsoup_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync dark mode class with body tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('beautifulsoup_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('beautifulsoup_theme', 'light');
    }
  }, [darkMode]);

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = '', selectedSize = '') => {
    setCart((prevCart) => {
      // Check if product with same options already exists in cart
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedColor, selectedSize }];
    });
  };

  const updateQuantity = (productId, selectedColor, selectedSize, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Auth operations (placeholders for FastAPI + MySQL integration)
  const login = async (email, password) => {
    console.log('[Auth Context Info] login method triggered. FastAPI connection pending.');
    // Under instruction, we do NOT set active user/token to pretend user is logged in.
    return { success: false, message: 'FastAPI auth backend not connected.' };
  };

  const register = async (email, password, name) => {
    console.log('[Auth Context Info] register method triggered. FastAPI connection pending.');
    return { success: false, message: 'FastAPI auth backend not connected.' };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    console.log('[Auth Context Info] logged out (reset placeholder states)');
  };

  // Derive cart calculations
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const shippingFee = cartSubtotal > 150 || cartItemCount === 0 ? 0 : 15.0;
  const taxRate = 0.08; // 8% sales tax
  const taxFee = cartSubtotal * taxRate;
  const cartTotal = cartSubtotal + shippingFee + taxFee;

  return (
    <StoreContext.Provider
      value={{
        cart,
        token,
        user,
        darkMode,
        cartSubtotal,
        cartItemCount,
        shippingFee,
        taxFee,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleTheme,
        login,
        register,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
