import React from 'react';
import { BookType, BookPersonalization } from '../types/book';
import { languages, bookFormats } from '../data/books';

interface BookPersonalizationFormProps {
  book: BookType;
  personalization: BookPersonalization;
  onUpdate: (personalization: BookPersonalization) => void;
}

export function BookPersonalizationForm({
  book,
  personalization,
  onUpdate
}: BookPersonalizationFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onUpdate({
      ...personalization,
      [name]: value
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-lobster text-shadow text-center">
        Personnalisez votre livre
      </h2>

      <div className="space-y-6">
        {/* Prénom */}
        <div>
          <label htmlFor="childName" className="block text-sm font-medium mb-2">
            Prénom de l'enfant *
          </label>
          <input
            type="text"
            id="childName"
            name="childName"
            value={personalization.childName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Dédicace */}
        <div>
          <label htmlFor="dedication" className="block text-sm font-medium mb-2">
            Dédicace personnalisée (optionnel)
          </label>
          <textarea
            id="dedication"
            name="dedication"
            value={personalization.dedication}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
            placeholder="Écrivez un message personnel qui apparaîtra au début du livre..."
          />
        </div>

        {/* Langue */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium mb-2">
            Langue du livre *
          </label>
          <select
            id="language"
            name="language"
            value={personalization.language}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
            required
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium mb-4">
            Format du livre *
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {bookFormats.map((format) => (
              <button
                key={format.id}
                type="button"
                onClick={() => onUpdate({
                  ...personalization,
                  format: format.id as 'digital' | 'printed'
                })}
                className={`p-4 rounded-lg text-center transition-all ${
                  personalization.format === format.id
                    ? 'bg-accent text-dark'
                    : 'bg-white/50 hover:bg-accent/20'
                }`}
              >
                <div className="font-medium mb-2">{format.name}</div>
                <div className="text-sm text-dark/60 dark:text-white/60">
                  {format.price.toFixed(2)} €
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}