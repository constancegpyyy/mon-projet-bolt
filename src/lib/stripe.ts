import { loadStripe } from '@stripe/stripe-js';

// Initialisation de Stripe avec la clé publique
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Types pour les paiements
export interface PaymentIntent {
  clientSecret: string;
  id: string;
}

// Fonction pour créer une intention de paiement
export const createPaymentIntent = async (amount: number, currency: string = 'eur'): Promise<PaymentIntent> => {
  const response = await fetch('https://ytwdhvakejnylmbhrluz.supabase.co/functions/v1/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ amount, currency }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création du paiement');
  }

  return response.json();
};

// Fonction pour confirmer un paiement
export const confirmPayment = async (clientSecret: string, paymentMethod: any) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe n\'est pas initialisé');

  return stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod,
  });
};