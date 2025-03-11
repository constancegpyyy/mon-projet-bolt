import React from 'react';
import { Sparkles } from 'lucide-react';

interface CrossSellProps {
  onAdd: () => void;
}

export function CrossSell({ onAdd }: CrossSellProps) {
  return (
    <div className="rounded-lg border border-accent bg-accent/10 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-highlight" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Offre spéciale !
          </h3>
          <p className="text-secondary mb-4">
            Ajoutez un second livre et bénéficiez de -20% sur le deuxième !
          </p>
          <button
            onClick={onAdd}
            className="btn"
          >
            Ajouter un livre
          </button>
        </div>
      </div>
    </div>
  );
}