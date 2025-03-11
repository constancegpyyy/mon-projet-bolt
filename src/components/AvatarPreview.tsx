import React from 'react';

interface AvatarPreviewProps {
  avatar?: {
    skinTone?: string;
    hairStyle?: string;
    hairLength?: string;
    hairColor?: string;
    eyeColor?: string;
  };
}

const defaultAvatar = {
  skinTone: 'medium',
  hairStyle: 'straight',
  hairLength: 'medium',
  hairColor: 'brown',
  eyeColor: 'brown'
};

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  // Fusion des valeurs par défaut avec les props reçues
  const safeAvatar = {
    ...defaultAvatar,
    ...avatar
  };

  // Couleurs style cartoon
  const skinToneColors = {
    'light': '#FFE6D5',
    'medium': '#FFBB98',
    'dark': '#FF8C69'
  };

  const hairColors = {
    'blonde': '#FFE135',
    'brown': '#8B4513',
    'red': '#FF4040',
    'black': '#1B1B1B'
  };

  const eyeColors = {
    'blue': '#4FC3F7',
    'green': '#66BB6A',
    'brown': '#795548',
    'black': '#1B1B1B'
  };

  const getHairPath = () => {
    const length = safeAvatar.hairLength || 'medium';
    const style = safeAvatar.hairStyle || 'straight';

    if (style === 'straight') {
      switch (length) {
        case 'short':
          return `
            M 25,40 
            C 25,25 35,20 50,20 
            C 65,20 75,25 75,40 
            C 75,45 70,50 65,52
            C 60,54 55,55 50,55
            C 45,55 40,54 35,52
            C 30,50 25,45 25,40
          `;
        case 'medium':
          return `
            M 20,40
            C 20,20 35,15 50,15
            C 65,15 80,20 80,40
            C 80,60 65,75 50,75
            C 35,75 20,60 20,40
            M 30,35
            C 35,25 45,22 50,22
            C 55,22 65,25 70,35
          `;
        case 'long':
          return `
            M 15,40
            C 15,20 35,10 50,10
            C 65,10 85,20 85,40
            C 85,70 65,90 50,90
            C 35,90 15,70 15,40
            M 25,35
            C 35,20 45,18 50,18
            C 55,18 65,20 75,35
          `;
        default:
          return '';
      }
    }

    if (style === 'curly') {
      return `
        M 20,40
        Q 20,20 35,15
        Q 45,10 50,10
        Q 55,10 65,15
        Q 80,20 80,40
        Q 80,60 65,75
        Q 55,80 50,80
        Q 45,80 35,75
        Q 20,60 20,40
        M 30,30
        Q 40,40 50,30
        Q 60,40 70,30
      `;
    }

    if (style === 'afro') {
      return `
        M 15,45
        Q 15,15 50,15
        Q 85,15 85,45
        Q 85,75 50,85
        Q 15,75 15,45
        M 25,35
        Q 35,25 50,25
        Q 65,25 75,35
      `;
    }

    return '';
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        {/* Ombre douce */}
        <filter id="cartoon-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Brillance */}
        <radialGradient id="shine" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Tête */}
      <g filter="url(#cartoon-shadow)">
        {/* Visage */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill={skinToneColors[safeAvatar.skinTone as keyof typeof skinToneColors] || skinToneColors.medium}
        />
        <circle
          cx="40"
          cy="40"
          r="15"
          fill="url(#shine)"
        />

        {/* Cheveux */}
        <path
          d={getHairPath()}
          fill={hairColors[safeAvatar.hairColor as keyof typeof hairColors] || hairColors.brown}
          strokeWidth="1"
          stroke={hairColors[safeAvatar.hairColor as keyof typeof hairColors] || hairColors.brown}
        />

        {/* Yeux */}
        <g>
          {/* Œil gauche */}
          <circle cx="40" cy="45" r="5" fill="white" />
          <circle
            cx="40"
            cy="45"
            r="3"
            fill={eyeColors[safeAvatar.eyeColor as keyof typeof eyeColors] || eyeColors.brown}
          />
          <circle cx="42" cy="43" r="1" fill="white" />

          {/* Œil droit */}
          <circle cx="60" cy="45" r="5" fill="white" />
          <circle
            cx="60"
            cy="45"
            r="3"
            fill={eyeColors[safeAvatar.eyeColor as keyof typeof eyeColors] || eyeColors.brown}
          />
          <circle cx="62" cy="43" r="1" fill="white" />
        </g>

        {/* Joues (style cartoon) */}
        <circle cx="35" cy="55" r="4" fill="#FFB6C1" opacity="0.3" />
        <circle cx="65" cy="55" r="4" fill="#FFB6C1" opacity="0.3" />

        {/* Bouche */}
        <path
          d="M45,60 Q50,65 55,60"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}