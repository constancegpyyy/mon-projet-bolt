import React, { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 animate-slide-in">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Gift className="w-8 h-8 text-highlight" />
          </div>
          
          <h2 className="text-2xl font-lobster text-shadow mb-4">
            Attendez !
          </h2>
          
          <p className="text-secondary mb-6">
            Votre livre est presque prêt 🎁 ! Terminez votre commande maintenant et recevez une surprise en plus.
          </p>

          <button
            onClick={() => setShow(false)}
            className="btn w-full"
          >
            Terminer ma commande
          </button>

          <button
            onClick={() => setShow(false)}
            className="mt-4 text-sm text-muted hover:text-primary transition-colors"
          >
            Non merci, je reviendrai plus tard
          </button>
        </div>
      </div>
    </div>
  );
}