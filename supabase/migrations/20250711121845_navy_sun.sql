/*
  # Seed Initial Data for Aura Nest

  1. Categories Data
  2. Brands Data  
  3. Products Data
*/

-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Moisturizer', 'Hydrating creams and lotions for all skin types', 'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Sunscreen', 'UV protection for healthy skin', 'https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Primer', 'Base makeup for flawless application', 'https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Toner', 'Balancing and refreshing skin toners', 'https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Foundation', 'Coverage and complexion perfection', 'https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Serum', 'Concentrated treatments for specific concerns', 'https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Cleanser', 'Gentle cleansing for fresh skin', 'https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Lipstick', 'Color and care for beautiful lips', 'https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Blush', 'Natural flush and color for cheeks', 'https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Mascara', 'Volume and length for lashes', 'https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT (name) DO NOTHING;

-- Insert brands
INSERT INTO brands (name, description) VALUES
('Dr. Sheths', 'Science-backed skincare solutions for Indian skin'),
('Aqualogica', 'Hydrating skincare with natural ingredients')
ON CONFLICT (name) DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Vitamin C Daily Moisturizer',
  'Lightweight daily moisturizer with Vitamin C for brightening and hydration.',
  899.00,
  1299.00,
  'https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
  4.5,
  234,
  50
FROM categories c, brands b 
WHERE c.name = 'Moisturizer' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Ceramide & Hyaluronic Acid Moisturizer',
  'Deep hydrating moisturizer with ceramides for dry skin.',
  749.00,
  999.00,
  'https://images.pexels.com/photos/7690363/pexels-photo-7690363.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Ceramides', 'Hyaluronic Acid', 'Glycerin'],
  4.7,
  189,
  45
FROM categories c, brands b 
WHERE c.name = 'Moisturizer' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Overnight Repair Moisturizer',
  'Night moisturizer with retinol and peptides for anti-aging.',
  1199.00,
  1599.00,
  'https://images.pexels.com/photos/6621107/pexels-photo-6621107.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Retinol', 'Peptides', 'Shea Butter'],
  4.6,
  156,
  30
FROM categories c, brands b 
WHERE c.name = 'Moisturizer' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'SPF 50 Invisible Sunscreen',
  'Broad spectrum SPF 50 with invisible finish.',
  649.00,
  849.00,
  'https://images.pexels.com/photos/6621304/pexels-photo-6621304.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E'],
  4.4,
  312,
  60
FROM categories c, brands b 
WHERE c.name = 'Sunscreen' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Mineral Sunscreen SPF 30',
  'Mineral sunscreen with SPF 30 for sensitive skin.',
  799.00,
  1099.00,
  'https://images.pexels.com/photos/6621028/pexels-photo-6621028.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Zinc Oxide', 'Aloe Vera', 'Green Tea'],
  4.3,
  198,
  40
FROM categories c, brands b 
WHERE c.name = 'Sunscreen' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Pore Minimizing Primer',
  'Silicone-free primer that minimizes pores and creates smooth base.',
  599.00,
  799.00,
  'https://images.pexels.com/photos/6621095/pexels-photo-6621095.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Silica', 'Dimethicone', 'Hyaluronic Acid'],
  4.5,
  267,
  35
FROM categories c, brands b 
WHERE c.name = 'Primer' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Illuminating Primer',
  'Luminous primer with light-reflecting particles for glowing skin.',
  699.00,
  899.00,
  'https://images.pexels.com/photos/6621063/pexels-photo-6621063.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Mica', 'Pearl Powder', 'Vitamin E'],
  4.6,
  145,
  25
FROM categories c, brands b 
WHERE c.name = 'Primer' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Niacinamide Toner',
  'Balancing toner with niacinamide for oil control and pore refinement.',
  549.00,
  749.00,
  'https://images.pexels.com/photos/6621282/pexels-photo-6621282.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Niacinamide', 'Zinc PCA', 'Salicylic Acid'],
  4.4,
  223,
  55
FROM categories c, brands b 
WHERE c.name = 'Toner' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Hydrating Rose Toner',
  'Gentle rose toner for hydration and soothing sensitive skin.',
  499.00,
  699.00,
  'https://images.pexels.com/photos/6621105/pexels-photo-6621105.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Rose Water', 'Glycerin', 'Chamomile'],
  4.7,
  189,
  70
FROM categories c, brands b 
WHERE c.name = 'Toner' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Full Coverage Foundation',
  'Long-wearing full coverage foundation with SPF 20.',
  1299.00,
  1699.00,
  'https://images.pexels.com/photos/6621082/pexels-photo-6621082.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Titanium Dioxide', 'Iron Oxides', 'Hyaluronic Acid'],
  4.3,
  167,
  20
FROM categories c, brands b 
WHERE c.name = 'Foundation' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Natural Finish Foundation',
  'Medium coverage foundation with natural finish.',
  999.00,
  1299.00,
  'https://images.pexels.com/photos/6621073/pexels-photo-6621073.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Titanium Dioxide', 'Squalane', 'Vitamin E'],
  4.5,
  234,
  30
FROM categories c, brands b 
WHERE c.name = 'Foundation' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Vitamin C Serum',
  'Brightening vitamin C serum with ferulic acid.',
  899.00,
  1199.00,
  'https://images.pexels.com/photos/6621307/pexels-photo-6621307.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Vitamin C', 'Ferulic Acid', 'Hyaluronic Acid'],
  4.6,
  312,
  40
FROM categories c, brands b 
WHERE c.name = 'Serum' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Niacinamide Serum',
  'Pore-refining serum with 10% niacinamide.',
  749.00,
  999.00,
  'https://images.pexels.com/photos/6621064/pexels-photo-6621064.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid'],
  4.4,
  198,
  35
FROM categories c, brands b 
WHERE c.name = 'Serum' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Gentle Foaming Cleanser',
  'Gentle foaming cleanser for all skin types.',
  449.00,
  599.00,
  'https://images.pexels.com/photos/6621035/pexels-photo-6621035.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Salicylic Acid', 'Glycerin', 'Chamomile'],
  4.5,
  267,
  80
FROM categories c, brands b 
WHERE c.name = 'Cleanser' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Hydrating Cream Cleanser',
  'Creamy cleanser that does not strip natural oils.',
  399.00,
  549.00,
  'https://images.pexels.com/photos/6621106/pexels-photo-6621106.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Ceramides', 'Hyaluronic Acid', 'Glycerin'],
  4.7,
  189,
  65
FROM categories c, brands b 
WHERE c.name = 'Cleanser' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Matte Lipstick',
  'Long-wearing matte lipstick in bold red.',
  699.00,
  899.00,
  'https://images.pexels.com/photos/6621084/pexels-photo-6621084.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Vitamin E', 'Jojoba Oil', 'Carnauba Wax'],
  4.6,
  145,
  50
FROM categories c, brands b 
WHERE c.name = 'Lipstick' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Glossy Lipstick',
  'Hydrating glossy lipstick with sheer color.',
  599.00,
  799.00,
  'https://images.pexels.com/photos/6621085/pexels-photo-6621085.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Hyaluronic Acid', 'Shea Butter', 'Vitamin E'],
  4.4,
  223,
  45
FROM categories c, brands b 
WHERE c.name = 'Lipstick' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Powder Blush',
  'Buildable powder blush in natural pink.',
  549.00,
  749.00,
  'https://images.pexels.com/photos/6621088/pexels-photo-6621088.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Mica', 'Talc', 'Vitamin E'],
  4.5,
  189,
  40
FROM categories c, brands b 
WHERE c.name = 'Blush' AND b.name = 'Dr. Sheths';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Cream Blush',
  'Cream blush for natural dewy finish.',
  649.00,
  849.00,
  'https://images.pexels.com/photos/6621089/pexels-photo-6621089.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Shea Butter', 'Jojoba Oil', 'Vitamin E'],
  4.7,
  167,
  35
FROM categories c, brands b 
WHERE c.name = 'Blush' AND b.name = 'Aqualogica';

INSERT INTO products (name, description, price, original_price, image_url, category_id, brand_id, ingredients, rating, reviews_count, stock_quantity) 
SELECT 
  'Volumizing Mascara',
  'Volumizing mascara for dramatic lashes.',
  799.00,
  999.00,
  'https://images.pexels.com/photos/6621090/pexels-photo-6621090.jpeg?auto=compress&cs=tinysrgb&w=500',
  c.id,
  b.id,
  ARRAY['Carnauba Wax', 'Beeswax', 'Vitamin E'],
  4.6,
  234,
  60
FROM categories c, brands b 
WHERE c.name = 'Mascara' AND b.name = 'Dr. Sheths';