import React, { useState, useEffect } from 'react';
import { Gift, X, Download } from 'lucide-react';

interface FreeGiftPopupProps {
  onClose: () => void;
  onClaim: () => void;
}

export function FreeGiftPopup({ onClose, onClaim }: FreeGiftPopupProps) {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Gift className="w-8 h-8 text-highlight" />
          </div>
          
          <h2 className="text-2xl font-lobster text-shadow mb-4">
            Cadeau exclusif !
          </h2>
          
          <p className="text-dark/80 mb-6">
            Téléchargez gratuitement un extrait personnalisé de l'histoire de votre enfant !
          </p>

          <form onSubmit={(e) => {
            e.preventDefault();
            onClaim();
          }} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
              required
            />

            <button
              type="submit"
              className="btn w-full flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger mon extrait gratuit
            </button>
          </form>

          <p className="mt-4 text-xs text-muted">
            En téléchargeant l'extrait, vous acceptez de recevoir nos newsletters. 
            Vous pourrez vous désinscrire à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
}