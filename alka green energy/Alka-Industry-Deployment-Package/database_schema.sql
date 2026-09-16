-- Database schema for FashionVerse AI (PostgreSQL)

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin'
     loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Style Profile (For AI recommendations and personality)
CREATE TABLE user_style_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    personality VARCHAR(100), -- 'Minimalist', 'Creative', 'Streetwear', etc.
    preferred_fit VARCHAR(50), -- 'Slim', 'Regular', 'Oversized'
    gender VARCHAR(50),
    height_cm INT,
    weight_kg INT,
    age INT,
    favorite_colors TEXT[], -- Array of colors
    favorite_categories TEXT[], -- Array of categories
    budget_range VARCHAR(50), -- 'Low', 'Medium', 'Premium', 'Ultra-Luxury'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_pct INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    sizes VARCHAR(50)[] NOT NULL, -- e.g. ['S', 'M', 'L', 'XL']
    colors VARCHAR(50)[] NOT NULL, -- e.g. ['Black', 'Off-White']
    materials VARCHAR(100)[] NOT NULL, -- e.g. ['Organic Cotton', 'Silk']
    fit VARCHAR(50) NOT NULL, -- e.g. 'Oversized', 'Regular', 'Slim'
    occasion VARCHAR(100) NOT NULL, -- e.g. 'Casual', 'Evening Wear', 'Sport'
    is_sustainable BOOLEAN DEFAULT FALSE,
    is_designer BOOLEAN DEFAULT FALSE,
    stock INT DEFAULT 0,
    video_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE
);

-- Coupons
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_pct INT NOT NULL,
    expiry_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Nullable for Guest Checkout
    email VARCHAR(255) NOT NULL, -- Keep email for receipts & guest orders
    guest_name VARCHAR(255),
    shipping_address TEXT NOT NULL,
    billing_address TEXT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'Stripe', 'Razorpay', 'Mock'
    payment_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Paid', 'Failed'
    order_status VARCHAR(50) DEFAULT 'Processing', -- 'Processing', 'Shipped', 'Delivered', 'Cancelled'
    tracking_number VARCHAR(100),
    coupon_applied VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image_url VARCHAR(500)
);

-- Product Reviews
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
