import React from 'react';
import { BookCategory } from '../types/book';
import { books } from '../data/books';

interface CategorySelectorProps {
  categories: BookCategory[];
  selectedCategory: string | null;
  onSelect: (category: string) => void;
}

export function CategorySelector({ categories, selectedCategory, onSelect }: CategorySelectorProps) {
  // Count books in each category
  const categoryBookCounts = categories.reduce((acc, category) => {
    acc[category.id] = books.filter(book => book.category === category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-lobster text-shadow text-center">
        {categories[0]?.type === 'educational' 
          ? "Quel domaine d'apprentissage souhaitez-vous explorer ?"
          : "Quelle catégorie d'histoire souhaitez-vous ?"}
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`p-6 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-accent text-dark'
                : 'bg-white/50 hover:bg-accent/20'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <span className="text-center font-medium">{category.name}</span>
              <span className="text-sm text-dark/60 dark:text-white/60">
                {categoryBookCounts[category.id] || 0} livre{categoryBookCounts[category.id] !== 1 ? 's' : ''}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}