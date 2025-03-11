import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Types pour les tables
export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  base_price: number;
  formats: ('hardcover' | 'paperback' | 'digital')[];
  age_range: [number, number] | null;
  is_customizable: boolean;
  available_quantity: number | null;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  shipping_address: any;
  billing_address: any;
  payment_intent_id: string | null;
  shipping_tracking_id: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
}

// API pour les livres
export const booksApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('books')
      .select('*, book_categories(*)');
    
    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('books')
      .select('*, book_categories(*)')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from('books')
      .select('*, book_categories(*)')
      .eq('book_categories.slug', categorySlug);
    
    if (error) throw error;
    return data;
  }
};

// API pour les commandes
export const ordersApi = {
  async create(order: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCustomerOrders(customerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, books(*))')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, books(*))')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// API pour les illustrations
export const illustrationsApi = {
  async create(illustration: { 
    book_id: string;
    customer_id: string;
    prompt: string;
    image_url: string;
    dalle_response: any;
  }) {
    const { data, error } = await supabase
      .from('book_illustrations')
      .insert([illustration])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCustomerIllustrations(customerId: string) {
    const { data, error } = await supabase
      .from('book_illustrations')
      .select('*, books(*)')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// API pour les préférences clients
export const preferencesApi = {
  async get(customerId: string) {
    const { data, error } = await supabase
      .from('customer_preferences')
      .select('*')
      .eq('customer_id', customerId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async update(customerId: string, preferences: any) {
    const { data, error } = await supabase
      .from('customer_preferences')
      .upsert([{ customer_id: customerId, ...preferences }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};