import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { StripeCheckout } from '../components/StripeCheckout';
import { OneClickCheckout } from '../components/OneClickCheckout';
import { ShoppingBag } from 'lucide-react';

export function Cart() {
  const { items, total } = useCart();
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);

  const handleStripeSuccess = async (paymentIntent: any) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✨</span>
        <span>Paiement réussi ! Merci de votre commande.</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    window.location.href = '/confirmation';
  };

  const handleStripeError = (error: Error) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-error text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">❌</span>
        <span>${error.message}</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left">
            Votre Panier
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Voici votre sélection de livres personnalisés. Vérifiez vos informations avant de 
            finaliser votre commande.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="max-w-lg mx-auto">
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80">
              <h2 className="text-2xl font-lobster text-shadow mb-6">Récapitulatif</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={`${item.bookId}-${index}`} className="flex justify-between items-center">
                    <span>{item.title}</span>
                    <span className="font-semibold">{item.price.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="border-t border-dark/10 dark:border-white/10 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {/* Stripe Checkout */}
              {showStripeCheckout ? (
                <StripeCheckout
                  amount={total * 100}
                  onSuccess={handleStripeSuccess}
                  onError={handleStripeError}
                />
              ) : (
                <OneClickCheckout
                  price={total}
                  onCheckout={() => setShowStripeCheckout(true)}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-dark/20 dark:text-white/20" />
            <h2 className="text-2xl font-lobster text-shadow mb-6">
              Votre panier est vide
            </h2>
            <p className="text-dark/60 dark:text-white/60 mb-8">
              Découvrez nos livres personnalisés et créez une histoire unique pour votre enfant.
            </p>
            <Link to="/livres-originaux" className="btn inline-flex items-center gap-2">
              <span>Voir nos livres</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}