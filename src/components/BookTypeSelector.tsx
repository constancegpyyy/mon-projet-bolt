import React from 'react';
import { Book, GraduationCap, Sparkles } from 'lucide-react';

interface BookTypeSelectorProps {
  selectedType: 'narrative' | 'educational' | 'custom' | null;
  onSelect: (type: 'narrative' | 'educational' | 'custom') => void;
}

export function BookTypeSelector({ selectedType, onSelect }: BookTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-lobster text-shadow text-center">
        Choisissez le type d'histoire pour votre livre personnalisé
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => onSelect('narrative')}
          className={`p-6 rounded-lg transition-all ${
            selectedType === 'narrative'
              ? 'bg-accent text-dark'
              : 'bg-white/50 hover:bg-accent/20'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Book className="w-12 h-12" />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Nos histoires narratives</h3>
              <p className="text-sm text-dark/60 dark:text-white/60 mb-4">
                Des aventures passionnantes et imaginatives
              </p>
              <div className="space-y-2 text-sm">
                <p>Version imprimée : 29,99€</p>
                <p>Version numérique : 19,99€</p>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('educational')}
          className={`p-6 rounded-lg transition-all ${
            selectedType === 'educational'
              ? 'bg-accent text-dark'
              : 'bg-white/50 hover:bg-accent/20'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <GraduationCap className="w-12 h-12" />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Nos histoires éducatives</h3>
              <p className="text-sm text-dark/60 dark:text-white/60 mb-4">
                Apprendre en s'amusant avec des histoires enrichissantes
              </p>
              <div className="space-y-2 text-sm">
                <p>Version imprimée : 29,99€</p>
                <p>Version numérique : 19,99€</p>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('custom')}
          className={`p-6 rounded-lg transition-all ${
            selectedType === 'custom'
              ? 'bg-accent text-dark'
              : 'bg-white/50 hover:bg-accent/20'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="w-12 h-12" />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Nos histoires sur mesure</h3>
              <p className="text-sm text-dark/60 dark:text-white/60 mb-4">
                Des histoires 100% personnalisables
              </p>
              <div className="space-y-2 text-sm">
                <p>Version imprimée : 39,99€</p>
                <p>Version numérique : 29,99€</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}