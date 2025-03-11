import React, { useState, useEffect } from 'react';
import { Clock, Package } from 'lucide-react';

interface UrgencyBannerProps {
  variant: 'stock' | 'time' | 'limited';
  stock?: number;
  endTime?: string;
}

export function UrgencyBanner({ variant, stock, endTime }: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (variant === 'time' && endTime) {
      const interval = setInterval(() => {
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();
        const distance = end - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

        if (distance < 0) {
          clearInterval(interval);
          setTimeLeft('Terminé');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [variant, endTime]);

  const bannerContent = {
    stock: {
      icon: <Package className="w-5 h-5 text-error" />,
      text: `⚠️ Attention : Plus que ${stock} exemplaires en stock !`
    },
    time: {
      icon: <Clock className="w-5 h-5 text-error" />,
      text: `⚡ Offre exclusive : Plus que ${timeLeft} pour en profiter !`
    },
    limited: {
      icon: <Package className="w-5 h-5 text-highlight" />,
      text: "📚 Édition limitée – Ne manquez pas cette occasion unique !"
    }
  };

  const { icon, text } = bannerContent[variant];

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 text-sm font-medium animate-pulse">
      {icon}
      <span>{text}</span>
    </div>
  );
}