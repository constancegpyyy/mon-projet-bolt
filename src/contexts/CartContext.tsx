import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  image: string;
  personalization: {
    childName: string;
    dedication?: string;
    avatar: {
      skinTone: string;
      hairStyle: string;
      hairLength: string;
      hairColor: string;
      eyeColor: string;
    };
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mon-histoire-unique-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (bookId: string) => {
    setItems(prev => prev.filter(item => item.bookId !== bookId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.length;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    itemCount,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}