import React from 'react';
import { User, BookOpen } from 'lucide-react';

interface PersonalizedWelcomeProps {
  user?: {
    name: string;
    childAge?: number;
    lastVisitedCategory?: string;
  };
}

export function PersonalizedWelcome({ user }: PersonalizedWelcomeProps) {
  if (!user) {
    return (
      <div className="p-6 rounded-lg bg-accent/10">
        <h2 className="text-2xl font-lobster text-shadow mb-4">
          Bienvenue sur Mon Histoire Unique !
        </h2>
        <p className="text-dark/80 dark:text-white/80">
          Découvrez nos histoires personnalisées et créez un livre unique pour votre enfant.
        </p>
      </div>
    );
  }

  const getPersonalizedMessage = () => {
    if (user.lastVisitedCategory === 'educational') {
      return `Les parents adorent ces histoires éducatives pour leurs enfants de ${user.childAge} ans !`;
    }
    return `Bonjour ${user.name} ! Voici nos livres les plus populaires pour les enfants de ${user.childAge} ans.`;
  };

  return (
    <div className="p-6 rounded-lg bg-accent/10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          <User className="w-6 h-6 text-highlight" />
        </div>
        <div>
          <h2 className="text-2xl font-lobster text-shadow">
            Bon retour {user.name} !
          </h2>
          <p className="text-dark/60 dark:text-white/60">
            Continuez votre aventure littéraire
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-dark/80 dark:text-white/80">
        <BookOpen className="w-5 h-5 text-highlight" />
        <p>{getPersonalizedMessage()}</p>
      </div>
    </div>
  );
}