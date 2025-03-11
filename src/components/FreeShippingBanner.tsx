import React from 'react';
import { Truck } from 'lucide-react';

export function FreeShippingBanner() {
  return (
    <div className="bg-accent text-primary py-2 px-4 text-center fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Truck className="w-5 h-5" />
        <p className="text-sm font-medium">
          🎁 Livraison offerte dès 50€ d'achat !
        </p>
      </div>
    </div>
  );
}