export const categories = [
  'Electronics',
  'Home & Living',
  'Apparel',
  'Fitness & Outdoors',
  'Books & Stationery'
];

export const mockProducts = [
  {
    id: 1,
    name: 'AeroMax Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 249.99,
    rating: 4.8,
    reviewCount: 320,
    description: 'Experience premium audio quality and advanced active noise-cancelling technology. Designed for comfort, style, and long battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    sizes: ['Standard'],
    colors: ['Midnight Black', 'Platinum Silver', 'Navy Blue'],
    specifications: {
      'Battery Life': 'Up to 40 hours',
      'Connectivity': 'Bluetooth 5.2, USB-C',
      'Weight': '250g',
      'Warranty': '1 Year'
    }
  },
  {
    id: 2,
    name: 'Minimalist Leather Wallet',
    category: 'Apparel',
    price: 49.99,
    rating: 4.5,
    reviewCount: 145,
    description: 'Crafted from premium full-grain leather, this slim cardholder wallet is designed to carry your essentials without the bulk.',
    image: 'https://images.unsplash.com/photo-1627124765138-b4bca043534a?w=800&auto=format&fit=crop&q=60',
    sizes: ['Slim', 'Bi-Fold'],
    colors: ['Tuscan Tan', 'Classic Black', 'Forest Green'],
    specifications: {
      'Material': 'Full-grain leather',
      'Capacity': 'Up to 8 cards + cash',
      'RFID Protection': 'Yes',
      'Dimensions': '10cm x 7.5cm'
    }
  },
  {
    id: 3,
    name: 'HydroFlow Stainless Steel Bottle',
    category: 'Fitness & Outdoors',
    price: 29.99,
    rating: 4.7,
    reviewCount: 680,
    description: 'Double-wall vacuum insulation keeps your beverages ice cold for up to 24 hours or hot for up to 12 hours. Rugged, durable, and leak-proof.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60',
    sizes: ['18 oz', '32 oz', '40 oz'],
    colors: ['Cobalt Blue', 'Stone Grey', 'Matte Black', 'Coral Pink'],
    specifications: {
      'Material': '18/8 Pro-Grade Stainless Steel',
      'BPA-Free': 'Yes',
      'Temp Retention': 'Cold: 24hrs, Hot: 12hrs',
      'Cap Type': 'Flex Straw Cap'
    }
  },
  {
    id: 4,
    name: 'SmartFit Premium Yoga Mat',
    category: 'Fitness & Outdoors',
    price: 59.99,
    rating: 4.6,
    reviewCount: 95,
    description: 'High-density cushioning provides maximum support and joint protection. Textured non-slip surface offers superior grip during intense workouts.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=60',
    sizes: ['72" x 24"'],
    colors: ['Lavender Purple', 'Slate Teal', 'Charcoal Black'],
    specifications: {
      'Material': 'Eco-friendly TPE',
      'Thickness': '6mm',
      'Weight': '1.2kg',
      'Texture': 'Dual-sided non-slip'
    }
  },
  {
    id: 5,
    name: 'Lumina Smart Ambient Lamp',
    category: 'Home & Living',
    price: 89.99,
    rating: 4.4,
    reviewCount: 112,
    description: 'Enhance your space with millions of customizable colors and sync options. Fully voice-controlled and compatible with smart home ecosystems.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60',
    sizes: ['Standard'],
    colors: ['Warm Wood', 'Frosted White'],
    specifications: {
      'Control Method': 'App, Voice, Touch',
      'Luminous Flux': '800 lumens',
      'Power Source': 'AC Adapter',
      'Smart Assistant': 'Alexa, Google Assistant'
    }
  },
  {
    id: 6,
    name: 'Classic Mechanical Keyboard',
    category: 'Electronics',
    price: 119.99,
    rating: 4.9,
    reviewCount: 204,
    description: 'A tactile, clicky typing experience designed for enthusiasts and professionals. Solid aluminum body with customizable RGB backlighting.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
    sizes: ['Tenkeyless (80%)', 'Full Size (100%)'],
    colors: ['Retro White', 'Slate Grey'],
    specifications: {
      'Switches': 'Cherry MX Brown / Blue',
      'Keycap Material': 'PBT Double-Shot',
      'Backlight': 'Per-key RGB',
      'Interface': 'Detachable USB-C'
    }
  },
  {
    id: 7,
    name: 'Modern Knit Running Shoes',
    category: 'Apparel',
    price: 129.99,
    rating: 4.3,
    reviewCount: 88,
    description: 'Engineered knit upper offers a sock-like fit and high breathability. Energy-returning foam midsole provides cushioning for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Neon Orange', 'Triple Black', 'Core Grey'],
    specifications: {
      'Upper Material': 'Recycled Engineered Knit',
      'Midsole': 'Proprietary Bounce Foam',
      'Weight': '280g',
      'Drop': '8mm'
    }
  },
  {
    id: 8,
    name: 'Hardcover Creative Journal',
    category: 'Books & Stationery',
    price: 24.99,
    rating: 4.8,
    reviewCount: 73,
    description: 'Perfect for sketching, bullet journaling, and writing. Features ultra-thick, ink-bleed-resistant dotted pages and a durable linen hardcover.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60',
    sizes: ['A5'],
    colors: ['Oatmeal Linen', 'Forest Green', 'Terracotta Red'],
    specifications: {
      'Paper Weight': '160 GSM',
      'Page Count': '160 dotted pages',
      'Binding': 'Lay-flat thread bound',
      'Features': 'Expansion pocket, dual ribbons'
    }
  }
];
