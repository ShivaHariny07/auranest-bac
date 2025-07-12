const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/auranest');
    await client.connect();
    db = client.db('auranest');
    console.log('Connected to MongoDB');
    
    // Initialize data if collections are empty
    await initializeData();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Initialize sample data
const initializeData = async () => {
  try {
    // Check if categories exist
    const categoriesCount = await db.collection('categories').countDocuments();
    if (categoriesCount === 0) {
      await seedCategories();
      await seedBrands();
      await seedProducts();
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

const seedCategories = async () => {
  const categories = [
    {
      name: 'Moisturizer',
      description: 'Hydrating creams and lotions for all skin types',
      image_url: 'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Sunscreen',
      description: 'UV protection for healthy skin',
      image_url: 'https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Primer',
      description: 'Base makeup for flawless application',
      image_url: 'https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Toner',
      description: 'Balancing and refreshing skin toners',
      image_url: 'https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Foundation',
      description: 'Coverage and complexion perfection',
      image_url: 'https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Serum',
      description: 'Concentrated treatments for specific concerns',
      image_url: 'https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Cleanser',
      description: 'Gentle cleansing for fresh skin',
      image_url: 'https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Lipstick',
      description: 'Color and care for beautiful lips',
      image_url: 'https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Blush',
      description: 'Natural flush and color for cheeks',
      image_url: 'https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    },
    {
      name: 'Mascara',
      description: 'Volume and length for lashes',
      image_url: 'https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=400',
      created_at: new Date()
    }
  ];

  await db.collection('categories').insertMany(categories);
};

const seedBrands = async () => {
  const brands = [
    {
      name: 'Dr. Sheths',
      description: 'Science-backed skincare solutions for Indian skin',
      created_at: new Date()
    },
    {
      name: 'Aqualogica',
      description: 'Hydrating skincare with natural ingredients',
      created_at: new Date()
    }
  ];

  await db.collection('brands').insertMany(brands);
};

const seedProducts = async () => {
  const categories = await db.collection('categories').find().toArray();
  const brands = await db.collection('brands').find().toArray();
  
  const drSheths = brands.find(b => b.name === 'Dr. Sheths');
  const aqualogica = brands.find(b => b.name === 'Aqualogica');
  
  const moisturizerCat = categories.find(c => c.name === 'Moisturizer');
  const sunscreenCat = categories.find(c => c.name === 'Sunscreen');
  const primerCat = categories.find(c => c.name === 'Primer');
  const tonerCat = categories.find(c => c.name === 'Toner');
  const foundationCat = categories.find(c => c.name === 'Foundation');
  const serumCat = categories.find(c => c.name === 'Serum');
  const cleanserCat = categories.find(c => c.name === 'Cleanser');
  const lipstickCat = categories.find(c => c.name === 'Lipstick');
  const blushCat = categories.find(c => c.name === 'Blush');
  const mascaraCat = categories.find(c => c.name === 'Mascara');

  const products = [
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
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
      created_at: new Date()
    },
    {
      name: 'Matte Lipstick',
      description: 'Long-wearing matte lipstick in bold red.',
      price: 699.00,
      original_price: 899.00,
      image_url: 'https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: lipstickCat._id,
      brand_id: drSheths._id,
      ingredients: ['Vitamin E', 'Jojoba Oil', 'Carnauba Wax'],
      rating: 4.6,
      reviews_count: 145,
      stock_quantity: 50,
      is_active: true,
      created_at: new Date()
    },
    {
      name: 'Powder Blush',
      description: 'Buildable powder blush in natural pink.',
      price: 549.00,
      original_price: 749.00,
      image_url: 'https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: blushCat._id,
      brand_id: drSheths._id,
      ingredients: ['Mica', 'Talc', 'Vitamin E'],
      rating: 4.5,
      reviews_count: 189,
      stock_quantity: 40,
      is_active: true,
      created_at: new Date()
    },
    {
      name: 'Volumizing Mascara',
      description: 'Volumizing mascara for dramatic lashes.',
      price: 799.00,
      original_price: 999.00,
      image_url: 'https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=500',
      category_id: mascaraCat._id,
      brand_id: drSheths._id,
      ingredients: ['Carnauba Wax', 'Beeswax', 'Vitamin E'],
      rating: 4.6,
      reviews_count: 234,
      stock_quantity: 60,
      is_active: true,
      created_at: new Date()
    }
  ];

  await db.collection('products').insertMany(products);
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

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      full_name: name,
      email,
      password_hash: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.collection('users').insertOne(user);
    
    // Generate token
    const token = jwt.sign(
      { userId: result.insertedId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertedId,
        name,
        email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.collection('users').findOne({ email });
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
    res.status(500).json({ error: 'Login failed' });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const { category, brand, search, sort } = req.query;
    let query = { is_active: true };

    if (category) {
      const categoryDoc = await db.collection('categories').findOne({ name: new RegExp(category, 'i') });
      if (categoryDoc) {
        query.category_id = categoryDoc._id;
      }
    }

    if (brand) {
      const brandDoc = await db.collection('brands').findOne({ name: new RegExp(brand, 'i') });
      if (brandDoc) {
        query.brand_id = brandDoc._id;
      }
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    let sortQuery = {};
    if (sort === 'price-low') sortQuery.price = 1;
    else if (sort === 'price-high') sortQuery.price = -1;
    else if (sort === 'rating') sortQuery.rating = -1;
    else sortQuery.name = 1;

    const products = await db.collection('products')
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand_id',
            foreignField: '_id',
            as: 'brand'
          }
        },
        {
          $addFields: {
            category_name: { $arrayElemAt: ['$category.name', 0] },
            brand_name: { $arrayElemAt: ['$brand.name', 0] }
          }
        },
        { $sort: sortQuery }
      ])
      .toArray();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('categories').find().sort({ name: 1 }).toArray();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Cart routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cartItems = await db.collection('cart_items')
      .aggregate([
        { $match: { user_id: new ObjectId(req.user.userId) } },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'product.brand_id',
            foreignField: '_id',
            as: 'brand'
          }
        },
        {
          $addFields: {
            product: { $arrayElemAt: ['$product', 0] },
            brand_name: { $arrayElemAt: ['$brand.name', 0] }
          }
        }
      ])
      .toArray();

    const formattedItems = cartItems.map(item => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image_url,
      brand: item.brand_name,
      quantity: item.quantity,
      cartItemId: item._id
    }));

    res.json(formattedItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    // Check if item already exists in cart
    const existingItem = await db.collection('cart_items').findOne({
      user_id: new ObjectId(req.user.userId),
      product_id: new ObjectId(product_id)
    });

    if (existingItem) {
      // Update quantity
      await db.collection('cart_items').updateOne(
        { _id: existingItem._id },
        { 
          $inc: { quantity: quantity },
          $set: { updated_at: new Date() }
        }
      );
    } else {
      // Add new item
      await db.collection('cart_items').insertOne({
        user_id: new ObjectId(req.user.userId),
        product_id: new ObjectId(product_id),
        quantity,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.put('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    await db.collection('cart_items').updateOne(
      { 
        _id: new ObjectId(req.params.id),
        user_id: new ObjectId(req.user.userId)
      },
      { 
        $set: { 
          quantity,
          updated_at: new Date()
        }
      }
    );

    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

app.delete('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    await db.collection('cart_items').deleteOne({
      _id: new ObjectId(req.params.id),
      user_id: new ObjectId(req.user.userId)
    });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    await db.collection('cart_items').deleteMany({
      user_id: new ObjectId(req.user.userId)
    });

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});