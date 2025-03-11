import React from 'react';
import { Award, Shield, Users } from 'lucide-react';

interface AuthorityBadgeProps {
  variant?: 'expert' | 'trust' | 'social';
}

export function AuthorityBadge({ variant = 'expert' }: AuthorityBadgeProps) {
  const badges = {
    expert: {
      icon: <Award className="w-5 h-5 text-highlight" />,
      text: "🏅 Recommandé par les experts en éducation et pédagogie"
    },
    trust: {
      icon: <Shield className="w-5 h-5 text-highlight" />,
      text: "Plus de 10 000 parents nous font déjà confiance !"
    },
    social: {
      icon: <Users className="w-5 h-5 text-highlight" />,
      text: "Rejoint par plus de 500 familles ce mois-ci"
    }
  };

  const { icon, text } = badges[variant];

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 text-sm font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}