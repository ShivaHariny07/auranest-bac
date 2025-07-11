import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart items from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem('aura_nest_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('aura_nest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            brands (name)
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = data.map(item => ({
        id: item.products.id,
        name: item.products.name,
        price: parseFloat(item.products.price),
        image: item.products.image_url,
        brand: item.products.brands.name,
        quantity: item.quantity,
        cartItemId: item.id
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find(item => item.id === product.id);

      if (user) {
        // Add to database for authenticated users
        if (existingItem) {
          // Update quantity in database
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('id', existingItem.cartItemId);

          if (error) throw error;
        } else {
          // Insert new item in database
          const { error } = await supabase
            .from('cart_items')
            .insert([
              {
                user_id: user.id,
                product_id: product.id,
                quantity: 1
              }
            ]);

          if (error) throw error;
        }
        
        // Reload cart from database
        await loadCartFromDatabase();
      } else {
        // Update local state for guest users
        if (existingItem) {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          setCartItems(prevItems => [
            ...prevItems,
            { ...product, quantity: 1 }
          ]);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user) {
        const item = cartItems.find(item => item.id === productId);
        if (item && item.cartItemId) {
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', item.cartItemId);

          if (error) throw error;
        }
        
        await loadCartFromDatabase();
      } else {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      if (user) {
        const item = cartItems.find(item => item.id === productId);
        if (item && item.cartItemId) {
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', item.cartItemId);

          if (error) throw error;
        }
        
        await loadCartFromDatabase();
      } else {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = async () => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      }
      
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};