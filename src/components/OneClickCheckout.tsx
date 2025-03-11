import React from 'react';
import { CreditCard } from 'lucide-react';

interface OneClickCheckoutProps {
  price: number;
  onCheckout: () => void;
}

export function OneClickCheckout({ price, onCheckout }: OneClickCheckoutProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={onCheckout}
        className="w-full px-4 py-3 rounded-lg bg-[#635BFF] text-white font-medium hover:bg-[#4F46E5] transition-colors flex items-center justify-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        Payer {price.toFixed(2)} € avec Stripe
      </button>

      <div className="text-center text-sm text-muted">
        <p>Paiement sécurisé par Stripe</p>
        <p>Vos données bancaires sont chiffrées</p>
      </div>
    </div>
  );
}