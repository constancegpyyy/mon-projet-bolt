import React from 'react';
import { Package } from 'lucide-react';

interface StockUrgencyProps {
  stock: number;
  isLimited?: boolean;
}

export function StockUrgency({ stock, isLimited = false }: StockUrgencyProps) {
  if (stock <= 0) return null;

  return (
    <div className={`flex items-center gap-2 text-sm ${
      stock <= 5 ? 'text-error' : 'text-info'
    }`}>
      <Package className="w-4 h-4" />
      {stock <= 5 ? (
        <span>📦 Plus que {stock} exemplaire{stock > 1 ? 's' : ''} disponible{stock > 1 ? 's' : ''} !</span>
      ) : isLimited ? (
        <span>📦 Édition limitée - {stock} exemplaires disponibles</span>
      ) : (
        <span>En stock</span>
      )}
    </div>
  );
}