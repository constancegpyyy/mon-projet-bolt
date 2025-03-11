import React from 'react';
import { BookType, BookPersonalization } from '../types/book';
import { languages, bookFormats } from '../data/books';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

interface OrderSummaryProps {
  book: BookType;
  personalization: BookPersonalization;
  onEdit: () => void;
  onOrder: () => void;
}

export function OrderSummary({
  book,
  personalization,
  onEdit,
  onOrder
}: OrderSummaryProps) {
  const selectedFormat = bookFormats.find(f => f.id === personalization.format);
  const selectedLanguage = languages.find(l => l.id === personalization.language);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-lobster text-shadow text-center">
        Récapitulatif de votre commande
      </h2>

      <div className="card space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-lobster text-shadow">
              {book.title.replace('(Prénom)', personalization.childName)}
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Prénom :</span>{' '}
                {personalization.childName}
              </p>
              {personalization.dedication && (
                <p>
                  <span className="font-medium">Dédicace :</span>{' '}
                  {personalization.dedication}
                </p>
              )}
              <p>
                <span className="font-medium">Langue :</span>{' '}
                {selectedLanguage?.name}
              </p>
              <p>
                <span className="font-medium">Format :</span>{' '}
                {selectedFormat?.name}
              </p>
              <p className="text-xl font-semibold mt-4">
                Prix : {selectedFormat?.price.toFixed(2)} €
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-dark/10">
          <button
            onClick={onEdit}
            className="btn bg-white/50 hover:bg-accent/20 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Modifier ma sélection
          </button>
          <button
            onClick={onOrder}
            className="btn flex-1 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Commander mon livre
          </button>
        </div>
      </div>
    </div>
  );
}