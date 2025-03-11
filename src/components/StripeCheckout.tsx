import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripe';
import { CreditCard, AlertCircle } from 'lucide-react';

interface CheckoutFormProps {
  clientSecret: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

function CheckoutForm({ clientSecret, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Une erreur est survenue');
        onError(error);
      } else if (paymentIntent) {
        onSuccess(paymentIntent);
      }
    } catch (e) {
      setErrorMessage('Une erreur inattendue est survenue');
      onError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`btn w-full flex items-center justify-center gap-2 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <CreditCard className="w-5 h-5" />
        {isLoading ? 'Traitement en cours...' : 'Payer maintenant'}
      </button>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function StripeCheckout({ amount, onSuccess, onError }: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Créer l'intention de paiement via Supabase Edge Function
    fetch('https://ytwdhvakejnylmbhrluz.supabase.co/functions/v1/create-payment-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ amount }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Erreur lors de la création du paiement');
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => onError(error));
  }, [amount]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#FFD626',
        colorBackground: '#ffffff',
        colorText: '#2C3E50',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}