import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface PricingDisplayProps {
  originalPrice: number;
  discountedPrice: number;
  format: 'digital' | 'printed';
  deadline?: string;
}

export function PricingDisplay({ originalPrice, discountedPrice, format, deadline }: PricingDisplayProps) {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-highlight">
          {discountedPrice.toFixed(2)} €
        </div>
        <div className="flex flex-col">
          <span className="text-sm line-through text-dark/60">
            {originalPrice.toFixed(2)} €
          </span>
          <span className="text-sm font-medium text-success">
            -{discount}% de réduction
          </span>
        </div>
      </div>

      {deadline && (
        <div className="flex items-center gap-2 text-sm text-error">
          <Clock className="w-4 h-4" />
          <span>Offre valable jusqu'à {deadline}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-dark/60">
        <AlertCircle className="w-4 h-4" />
        <span>
          {format === 'digital' 
            ? 'Téléchargement instantané après paiement'
            : 'Livraison gratuite sous 5-7 jours ouvrés'}
        </span>
      </div>
    </div>
  );
}