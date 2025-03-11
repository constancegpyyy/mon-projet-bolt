// Types pour les options d'avatar
export interface AvatarOptions {
  skinTone: string;
  eyeColor: string;
  hairColor: string;
  hairStyle: string;
  hairLength: string;
}

// Constantes pour les options valides
export const AVATAR_OPTIONS = {
  skinTone: ['light', 'medium', 'dark'] as const,
  eyeColor: ['blue', 'green', 'brown', 'black'] as const,
  hairColor: ['blonde', 'brown', 'red', 'black'] as const,
  hairStyle: ['straight', 'wavy', 'curly', 'afro'] as const,
  hairLength: ['short', 'medium', 'long'] as const
};

// Fonction pour générer le nom de fichier de l'avatar
export function generateAvatarFilename(options: AvatarOptions): string {
  const { skinTone, eyeColor, hairColor, hairStyle, hairLength } = options;
  
  // Normaliser les valeurs pour le nom de fichier
  const normalizedValues = {
    skinTone: `peau-${skinTone}`,
    eyeColor: `yeux-${eyeColor}`,
    hairColor: `cheveux-${hairColor}`,
    hairStyle: `type-${hairStyle}`,
    hairLength: `longueur-${hairLength}`
  };

  // Construire le nom de fichier
  return `avatar_${normalizedValues.skinTone}_${normalizedValues.eyeColor}_${normalizedValues.hairColor}_${normalizedValues.hairStyle}_${normalizedValues.hairLength}.png`;
}

// Fonction pour générer l'URL de l'avatar
export function generateAvatarUrl(options: AvatarOptions): string {
  try {
    const filename = generateAvatarFilename(options);
    return `/avatars/${filename}`;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL de l\'avatar:', error);
    return '/avatars/avatar_defaut.png';
  }
}

// Fonction pour valider les options de l'avatar
export function validateAvatarOptions(options: AvatarOptions): boolean {
  try {
    const { skinTone, eyeColor, hairColor, hairStyle, hairLength } = options;

    // Vérifier que chaque option est valide
    const isValidSkinTone = AVATAR_OPTIONS.skinTone.includes(skinTone as any);
    const isValidEyeColor = AVATAR_OPTIONS.eyeColor.includes(eyeColor as any);
    const isValidHairColor = AVATAR_OPTIONS.hairColor.includes(hairColor as any);
    const isValidHairStyle = AVATAR_OPTIONS.hairStyle.includes(hairStyle as any);
    const isValidHairLength = AVATAR_OPTIONS.hairLength.includes(hairLength as any);

    return (
      isValidSkinTone &&
      isValidEyeColor &&
      isValidHairColor &&
      isValidHairStyle &&
      isValidHairLength
    );
  } catch (error) {
    console.error('Erreur lors de la validation des options de l\'avatar:', error);
    return false;
  }
}

// Fonction pour obtenir l'avatar par défaut en cas d'erreur
export function getDefaultAvatar(): AvatarOptions {
  return {
    skinTone: 'medium',
    eyeColor: 'brown',
    hairColor: 'brown',
    hairStyle: 'straight',
    hairLength: 'medium'
  };
}