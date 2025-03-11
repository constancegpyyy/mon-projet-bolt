import { supabase } from './supabase';

export interface CustomBookOrder {
  type: 'narrative' | 'educational';
  category: string;
  childName: string;
  dedication?: string;
  language: string;
  format: 'digital' | 'printed';
  price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export const customBooksApi = {
  async createOrder(order: Omit<CustomBookOrder, 'status'>) {
    try {
      // Récupérer l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      // Créer la commande
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_id: user.id,
          status: 'pending',
          total_amount: order.price,
          metadata: {
            type: order.type,
            category: order.category,
            childName: order.childName,
            dedication: order.dedication,
            language: order.language,
            format: order.format
          }
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  },

  async getOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
};