import React from 'react';
import { Gift, Award, Crown, Star } from 'lucide-react';

interface LoyaltyProgramProps {
  points: number;
  purchaseCount: number;
  badges: string[];
  rank?: number;
}

export function LoyaltyProgram({ points, purchaseCount, badges, rank }: LoyaltyProgramProps) {
  const nextRewardPoints = Math.ceil(points / 100) * 100;
  const progress = (points % 100) / 100;

  return (
    <div className="space-y-8">
      {/* Points and Progress */}
      <div className="card backdrop-blur-sm bg-white/80">
        <h2 className="text-2xl font-lobster text-shadow mb-6">
          Vos Points Fidélité
        </h2>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-highlight">{points}</span>
            <span className="text-dark/60 dark:text-white/60 ml-2">points</span>
          </div>
          <div className="text-sm text-dark/60 dark:text-white/60">
            {nextRewardPoints - points} points avant la prochaine récompense
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-dark/10 rounded-full overflow-hidden mb-4">
          <div 
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Available Rewards */}
        <div className="space-y-4">
          <h3 className="font-semibold">Récompenses disponibles :</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="p-4 rounded-lg bg-white/50 hover:bg-accent/20 transition-colors text-left"
              disabled={points < 100}
            >
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-highlight" />
                <span className="font-medium">5% de réduction</span>
              </div>
              <span className="text-sm text-dark/60 dark:text-white/60">
                100 points requis
              </span>
            </button>
            <button 
              className="p-4 rounded-lg bg-white/50 hover:bg-accent/20 transition-colors text-left"
              disabled={purchaseCount < 5}
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-highlight" />
                <span className="font-medium">Livre gratuit</span>
              </div>
              <span className="text-sm text-dark/60 dark:text-white/60">
                5 achats requis
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges and Achievements */}
      <div className="card backdrop-blur-sm bg-white/80">
        <h2 className="text-2xl font-lobster text-shadow mb-6">
          Vos Badges
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-white/50 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-highlight" />
              </div>
              <span className="font-medium">{badge}</span>
            </div>
          ))}
          {purchaseCount >= 3 && (
            <div className="p-4 rounded-lg bg-white/50 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-highlight" />
              </div>
              <span className="font-medium">Super Parent</span>
            </div>
          )}
        </div>

        {rank && (
          <div className="mt-6 p-4 rounded-lg bg-accent/10 text-center">
            <p className="font-medium">
              🏆 Vous êtes dans le top {rank} de nos clients les plus fidèles !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}