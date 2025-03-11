import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookTypeSelector } from '../components/BookTypeSelector';
import { CategorySelector } from '../components/CategorySelector';
import { BookSelector } from '../components/BookSelector';
import { BookPersonalizationForm } from '../components/BookPersonalizationForm';
import { OrderSummary } from '../components/OrderSummary';
import { CustomBookForm } from '../components/CustomBookForm';
import { categories, books } from '../data/books';
import { BookType, BookPersonalization } from '../types/book';

const bookTypePricing = {
  narrative: {
    printed: 29.99,
    digital: 19.99
  },
  educational: {
    printed: 29.99,
    digital: 19.99
  },
  custom: {
    printed: 39.99,
    digital: 29.99
  }
};

export function CustomBook() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'type' | 'category' | 'book' | 'personalization' | 'summary' | 'custom'>('type');
  const [selectedType, setSelectedType] = useState<'narrative' | 'educational' | 'custom' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [personalization, setPersonalization] = useState<BookPersonalization>({
    childName: '',
    language: 'fr',
    format: 'printed'
  });

  const filteredCategories = categories.filter(cat => cat.type === selectedType);
  const filteredBooks = books.filter(book => 
    book.type === selectedType && book.category === selectedCategory
  );

  const handleTypeSelect = (type: 'narrative' | 'educational' | 'custom') => {
    setSelectedType(type);
    if (type === 'custom') {
      setStep('custom');
    } else {
      setStep('category');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep('book');
  };

  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book);
    setStep('personalization');
  };

  const handlePersonalizationUpdate = (newPersonalization: BookPersonalization) => {
    setPersonalization(newPersonalization);
    // Update price based on selected type and format
    if (selectedType && bookTypePricing[selectedType]) {
      const price = bookTypePricing[selectedType][newPersonalization.format];
      setSelectedBook(prev => prev ? { ...prev, price } : null);
    }
  };

  const handlePersonalizationComplete = () => {
    setStep('summary');
  };

  const handleEdit = () => {
    setStep('personalization');
  };

  const handleOrder = () => {
    // Add to cart and navigate to checkout
    navigate('/panier');
  };

  const handleCustomBookSubmit = (data: any) => {
    console.log('Custom book data:', data);
    navigate('/panier');
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark/10 -translate-y-1/2" />
            <div className="relative flex justify-between max-w-3xl mx-auto">
              {['type', 'category', 'book', 'personalization', 'summary'].map((s, index) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                    ['type', 'category', 'book', 'personalization', 'summary'].indexOf(step) >= index
                      ? 'bg-accent text-dark'
                      : 'bg-white/50 text-dark/40'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {step === 'type' && (
            <BookTypeSelector
              selectedType={selectedType}
              onSelect={handleTypeSelect}
            />
          )}

          {step === 'category' && selectedType && (
            <CategorySelector
              categories={filteredCategories}
              selectedCategory={selectedCategory}
              onSelect={handleCategorySelect}
            />
          )}

          {step === 'book' && (
            <BookSelector
              books={filteredBooks}
              selectedBook={selectedBook}
              onSelect={handleBookSelect}
              childName={personalization.childName}
            />
          )}

          {step === 'personalization' && selectedBook && (
            <div className="space-y-8">
              <BookPersonalizationForm
                book={selectedBook}
                personalization={personalization}
                onUpdate={handlePersonalizationUpdate}
              />
              <div className="flex justify-end">
                <button
                  onClick={handlePersonalizationComplete}
                  className="btn"
                  disabled={!personalization.childName || !personalization.language || !personalization.format}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {step === 'summary' && selectedBook && (
            <OrderSummary
              book={selectedBook}
              personalization={personalization}
              onEdit={handleEdit}
              onOrder={handleOrder}
            />
          )}

          {step === 'custom' && (
            <CustomBookForm onSubmit={handleCustomBookSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}