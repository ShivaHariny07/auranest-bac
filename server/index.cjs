const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Initialize database with default data
const initializeDB = async () => {
  await db.read();
  
  db.data ||= {
    users: [],
    categories: [],
    brands: [],
    products: [],
    cart_items: []
  };

  // Initialize sample data if empty
  if (db.data.categories.length === 0) {
    await seedData();
  }
  
  await db.write();
};

const seedData = async () => {
  // Categories
  const categories = [
    {
      _id: uuidv4(),
      name: 'Moisturizer',
      description: 'Hydrating creams and lotions for all skin types',
      image_url: 'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Sunscreen',
      description: 'UV protection for healthy skin',
      image_url: 'https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Primer',
      description: 'Base makeup for flawless application',
      image_url: 'https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Toner',
      description: 'Balancing and refreshing skin toners',
      image_url: 'https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Foundation',
      description: 'Coverage and complexion perfection',
      image_url: 'https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Serum',
      description: 'Concentrated treatments for specific concerns',
      image_url: 'https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Cleanser',
      description: 'Gentle cleansing for fresh skin',
      image_url: 'https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Lipstick',
      description: 'Color and care for beautiful lips',
      image_url: 'https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date().toISOString()
    }
  ];

  // Brands
  const brands = [
    {
      _id: uuidv4(),
      name: 'Dr. Sheths',
      description: 'Science-backed skincare solutions for Indian skin',
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Aqualogica',
      description: 'Hydrating skincare with natural ingredients',
      created_at: new Date().toISOString()
    }
  ];

  db.data.categories = categories;
  db.data.brands = brands;

  const drSheths = brands[0];
  const aqualogica = brands[1];
  
  const moisturizerCat = categories[0];
  const sunscreenCat = categories[1];
  const primerCat = categories[2];
  const tonerCat = categories[3];
  const foundationCat = categories[4];
  const serumCat = categories[5];
  const cleanserCat = categories[6];
  const lipstickCat = categories[7];

  // Products
  const products = [
    {
      _id: uuidv4(),
      name: 'Vitamin C Daily Moisturizer',
      description: 'Lightweight daily moisturizer with Vitamin C for brightening and hydration.',
      price: 899.00,
      original_price: 1299.00,
      image_url: 'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: moisturizerCat._id,
      brand_id: drSheths._id,
      ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
      rating: 4.5,
      reviews_count: 234,
      stock_quantity: 50,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Ceramide & Hyaluronic Acid Moisturizer',
      description: 'Deep hydrating moisturizer with ceramides for dry skin.',
      price: 749.00,
      original_price: 999.00,
      image_url: 'https://images.pexels.com/photos/7690363/pexels-photo-7690363.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: moisturizerCat._id,
      brand_id: aqualogica._id,
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'Glycerin'],
      rating: 4.7,
      reviews_count: 189,
      stock_quantity: 45,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'SPF 50 Invisible Sunscreen',
      description: 'Broad spectrum SPF 50 with invisible finish.',
      price: 649.00,
      original_price: 849.00,
      image_url: 'https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: sunscreenCat._id,
      brand_id: aqualogica._id,
      ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E'],
      rating: 4.4,
      reviews_count: 312,
      stock_quantity: 60,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Pore Minimizing Primer',
      description: 'Silicone-free primer that minimizes pores and creates smooth base.',
      price: 599.00,
      original_price: 799.00,
      image_url: 'https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: primerCat._id,
      brand_id: drSheths._id,
      ingredients: ['Silica', 'Dimethicone', 'Hyaluronic Acid'],
      rating: 4.5,
      reviews_count: 267,
      stock_quantity: 35,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Niacinamide Toner',
      description: 'Balancing toner with niacinamide for oil control and pore refinement.',
      price: 549.00,
      original_price: 749.00,
      image_url: 'https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: tonerCat._id,
      brand_id: drSheths._id,
      ingredients: ['Niacinamide', 'Zinc PCA', 'Salicylic Acid'],
      rating: 4.4,
      reviews_count: 223,
      stock_quantity: 55,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Full Coverage Foundation',
      description: 'Long-wearing full coverage foundation with SPF 20.',
      price: 1299.00,
      original_price: 1699.00,
      image_url: 'https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: foundationCat._id,
      brand_id: drSheths._id,
      ingredients: ['Titanium Dioxide', 'Iron Oxides', 'Hyaluronic Acid'],
      rating: 4.3,
      reviews_count: 167,
      stock_quantity: 20,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Vitamin C Serum',
      description: 'Brightening vitamin C serum with ferulic acid.',
      price: 899.00,
      original_price: 1199.00,
      image_url: 'https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: serumCat._id,
      brand_id: drSheths._id,
      ingredients: ['Vitamin C', 'Ferulic Acid', 'Hyaluronic Acid'],
      rating: 4.6,
      reviews_count: 312,
      stock_quantity: 40,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      _id: uuidv4(),
      name: 'Gentle Foaming Cleanser',
      description: 'Gentle foaming cleanser for all skin types.',
      price: 449.00,
      original_price: 599.00,
      image_url: 'https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: cleanserCat._id,
      brand_id: drSheths._id,
      ingredients: ['Salicylic Acid', 'Glycerin', 'Chamomile'],
      rating: 4.5,
      reviews_count: 267,
      stock_quantity: 80,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  db.data.products = products;
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await db.read();

    // Check if user exists
    const existingUser = db.data.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      _id: uuidv4(),
      full_name: name,
      email,
      password_hash: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.data.users.push(user);
    await db.write();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    await db.read();

    // Find user
    const user = db.data.users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    await db.read();
    
    const { category, brand, search, sort } = req.query;
    let products = db.data.products.filter(p => p.is_active);

    if (category) {
      const categoryDoc = db.data.categories.find(c => 
        c.name.toLowerCase().includes(category.toLowerCase())
      );
      if (categoryDoc) {
        products = products.filter(p => p.category_id === categoryDoc._id);
      }
    }

    if (brand) {
      const brandDoc = db.data.brands.find(b => 
        b.name.toLowerCase().includes(brand.toLowerCase())
      );
      if (brandDoc) {
        products = products.filter(p => p.brand_id === brandDoc._id);
      }
    }

    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Add category and brand names
    products = products.map(product => {
      const category = db.data.categories.find(c => c._id === product.category_id);
      const brand = db.data.brands.find(b => b._id === product.brand_id);
      
      return {
        ...product,
        category_name: category?.name || '',
        brand_name: brand?.name || ''
      };
    });

    // Sort products
    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    await db.read();
    const categories = db.data.categories.sort((a, b) => a.name.localeCompare(b.name));
    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Cart routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    await db.read();
    
    const cartItems = db.data.cart_items.filter(item => item.user_id === req.user.userId);
    
    const formattedItems = cartItems.map(item => {
      const product = db.data.products.find(p => p._id === item.product_id);
      const brand = db.data.brands.find(b => b._id === product?.brand_id);
      
      return {
        id: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image_url,
        brand: brand?.name,
        quantity: item.quantity,
        cartItemId: item._id
      };
    }).filter(item => item.id); // Filter out items with missing products

    res.json(formattedItems);
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    await db.read();

    // Check if item already exists in cart
    const existingItemIndex = db.data.cart_items.findIndex(item =>
      item.user_id === req.user.userId && item.product_id === product_id
    );

    if (existingItemIndex !== -1) {
      // Update quantity
      db.data.cart_items[existingItemIndex].quantity += quantity;
      db.data.cart_items[existingItemIndex].updated_at = new Date().toISOString();
    } else {
      // Add new item
      const newItem = {
        _id: uuidv4(),
        user_id: req.user.userId,
        product_id,
        quantity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.data.cart_items.push(newItem);
    }

    await db.write();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.put('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    await db.read();
    
    const itemIndex = db.data.cart_items.findIndex(item =>
      item._id === req.params.id && item.user_id === req.user.userId
    );

    if (itemIndex !== -1) {
      db.data.cart_items[itemIndex].quantity = quantity;
      db.data.cart_items[itemIndex].updated_at = new Date().toISOString();
      await db.write();
    }

    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

app.delete('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    await db.read();
    
    db.data.cart_items = db.data.cart_items.filter(item =>
      !(item._id === req.params.id && item.user_id === req.user.userId)
    );
    
    await db.write();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    await db.read();
    
    db.data.cart_items = db.data.cart_items.filter(item => item.user_id !== req.user.userId);
    
    await db.write();
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Start server
const startServer = async () => {
  try {
    await initializeDB();
    console.log('Database initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();