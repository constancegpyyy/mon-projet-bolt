import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { BookType } from '../types/book';
import { AuthorityBadge } from './AuthorityBadge';
import { PricingDisplay } from './PricingDisplay';
import { UrgencyBanner } from './UrgencyBanner';
import { FreeGiftPopup } from './FreeGiftPopup';

interface BookSelectorProps {
  books: BookType[];
  selectedBook: BookType | null;
  onSelect: (book: BookType) => void;
  childName?: string;
}

export function BookSelector({ books, selectedBook, onSelect, childName }: BookSelectorProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const booksPerPage = 6;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const displayedBooks = books.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const replaceNameInTitle = (title: string) => {
    return childName ? title.replace('(Prénom)', childName) : title;
  };

  // Calculate end of day for urgency timer
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-dark/60 dark:text-white/60">
          Aucun livre disponible dans cette catégorie pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-lobster text-shadow text-center">
          Choisissez votre histoire
        </h2>
        <AuthorityBadge variant="expert" />
      </div>

      <div className="relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBooks.map((book, index) => {
            const isLimited = index === 0; // First book is limited edition
            const hasLowStock = index === 1; // Second book has low stock
            const originalPrice = book.price ? book.price * 1.25 : 39.99; // 25% higher original price
            const currentPrice = book.price || 29.99;

            return (
              <div
                key={book.id}
                className={`card group cursor-pointer transition-all ${
                  selectedBook?.id === book.id ? 'ring-4 ring-accent' : ''
                }`}
                onClick={() => onSelect(book)}
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {isLimited && (
                    <div className="absolute top-4 right-4">
                      <UrgencyBanner variant="limited" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl mb-2 font-lobster text-shadow group-hover:text-highlight transition-colors">
                  {replaceNameInTitle(book.title)}
                </h3>
                
                <p className="text-sm text-dark/80 dark:text-white/80 mb-4">
                  {book.description}
                </p>

                {hasLowStock && (
                  <div className="mb-4">
                    <UrgencyBanner variant="stock" stock={3} />
                  </div>
                )}

                <div className="mb-4">
                  <PricingDisplay
                    originalPrice={originalPrice}
                    discountedPrice={currentPrice}
                    format="printed"
                    deadline="ce soir 23h59"
                  />
                </div>

                <button className="btn w-full">
                  Sélectionner ce livre
                </button>

                {book.rating && (
                  <div className="mt-4 flex items-center justify-between text-sm text-dark/60">
                    <div className="flex items-center gap-1">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-current" />
                      ))}
                    </div>
                    <span>{book.reviews} avis vérifiés</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-white/50 hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm">
                Page {currentPage + 1} sur {totalPages}
              </span>
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-full bg-white/50 hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Free Gift Popup */}
      {showGiftPopup && (
        <FreeGiftPopup
          onClose={() => setShowGiftPopup(false)}
          onClaim={() => {
            // Handle gift claim
            setShowGiftPopup(false);
            // Show success notification
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
            notification.innerHTML = `
              <div class="flex items-center gap-2">
                <span class="text-2xl">🎁</span>
                <span>Votre extrait gratuit a été envoyé par email !</span>
              </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
              notification.classList.add('animate-slide-out');
              setTimeout(() => notification.remove(), 300);
            }, 3000);
          }}
        />
      )}
    </div>
  );
}