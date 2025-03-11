import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { AvatarPreview } from './AvatarPreview';

interface AvatarGeneratorProps {
  onAvatarGenerated: (avatarOptions: AvatarOptions) => void;
}

interface AvatarOptions {
  skinTone: string;
  eyeColor: string;
  hairColor: string;
  hairStyle: string;
  hairLength: string;
}

const skinTones = [
  { id: 'peau-claire', name: 'Claire', hex: '#FFE6D5' },
  { id: 'peau-moyenne', name: 'Moyenne', hex: '#FFBB98' },
  { id: 'peau-foncee', name: 'Foncée', hex: '#FF8C69' }
];

const eyeColors = [
  { id: 'yeux-bleus', name: 'Bleu', hex: '#4FC3F7' },
  { id: 'yeux-verts', name: 'Vert', hex: '#66BB6A' },
  { id: 'yeux-marron', name: 'Marron', hex: '#795548' },
  { id: 'yeux-noirs', name: 'Noir', hex: '#1B1B1B' }
];

const hairColors = [
  { id: 'cheveux-blonds', name: 'Blond', hex: '#FFE135' },
  { id: 'cheveux-bruns', name: 'Brun', hex: '#8B4513' },
  { id: 'cheveux-roux', name: 'Roux', hex: '#FF4040' },
  { id: 'cheveux-noirs', name: 'Noir', hex: '#1B1B1B' }
];

const hairStyles = [
  { id: 'raides', name: 'Raides', icon: '💇‍♂️' },
  { id: 'ondules', name: 'Ondulés', icon: '💇' },
  { id: 'boucles', name: 'Bouclés', icon: '👨‍🦱' },
  { id: 'crepus', name: 'Crépus', icon: '🧑‍🦱' }
];

const hairLengths = [
  { id: 'courts', name: 'Courts', icon: '✂️' },
  { id: 'mi-longs', name: 'Mi-longs', icon: '💇' },
  { id: 'longs', name: 'Longs', icon: '👱‍♀️' }
];

export function AvatarGenerator({ onAvatarGenerated }: AvatarGeneratorProps) {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    skinTone: 'peau-moyenne',
    eyeColor: 'yeux-marron',
    hairColor: 'cheveux-bruns',
    hairStyle: 'raides',
    hairLength: 'mi-longs'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(true);

  const validateOptions = () => {
    const newErrors: Record<string, string> = {};

    if (!avatarOptions.skinTone) {
      newErrors.skinTone = 'La couleur de peau est requise';
    }
    if (!avatarOptions.eyeColor) {
      newErrors.eyeColor = 'La couleur des yeux est requise';
    }
    if (!avatarOptions.hairColor) {
      newErrors.hairColor = 'La couleur des cheveux est requise';
    }
    if (!avatarOptions.hairStyle) {
      newErrors.hairStyle = 'Le type de cheveux est requis';
    }
    if (!avatarOptions.hairLength) {
      newErrors.hairLength = 'La longueur des cheveux est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateOptions()) {
      onAvatarGenerated(avatarOptions);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Options */}
        <div className="space-y-6">
          {/* Skin Tone */}
          <div>
            <label htmlFor="skinTone" className="block text-sm font-medium mb-2">
              Couleur de peau *
            </label>
            <select
              id="skinTone"
              value={avatarOptions.skinTone}
              onChange={(e) => setAvatarOptions(prev => ({
                ...prev,
                skinTone: e.target.value
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
            >
              {skinTones.map(tone => (
                <option key={tone.id} value={tone.id}>{tone.name}</option>
              ))}
            </select>
            {errors.skinTone && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.skinTone}
              </p>
            )}
          </div>

          {/* Eye Color */}
          <div>
            <label htmlFor="eyeColor" className="block text-sm font-medium mb-2">
              Couleur des yeux *
            </label>
            <select
              id="eyeColor"
              value={avatarOptions.eyeColor}
              onChange={(e) => setAvatarOptions(prev => ({
                ...prev,
                eyeColor: e.target.value
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
            >
              {eyeColors.map(color => (
                <option key={color.id} value={color.id}>{color.name}</option>
              ))}
            </select>
            {errors.eyeColor && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.eyeColor}
              </p>
            )}
          </div>

          {/* Hair Color */}
          <div>
            <label htmlFor="hairColor" className="block text-sm font-medium mb-2">
              Couleur des cheveux *
            </label>
            <select
              id="hairColor"
              value={avatarOptions.hairColor}
              onChange={(e) => setAvatarOptions(prev => ({
                ...prev,
                hairColor: e.target.value
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
            >
              {hairColors.map(color => (
                <option key={color.id} value={color.id}>{color.name}</option>
              ))}
            </select>
            {errors.hairColor && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.hairColor}
              </p>
            )}
          </div>

          {/* Hair Style */}
          <div>
            <label htmlFor="hairStyle" className="block text-sm font-medium mb-2">
              Type de cheveux *
            </label>
            <select
              id="hairStyle"
              value={avatarOptions.hairStyle}
              onChange={(e) => setAvatarOptions(prev => ({
                ...prev,
                hairStyle: e.target.value
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
            >
              {hairStyles.map(style => (
                <option key={style.id} value={style.id}>{style.name}</option>
              ))}
            </select>
            {errors.hairStyle && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.hairStyle}
              </p>
            )}
          </div>

          {/* Hair Length */}
          <div>
            <label htmlFor="hairLength" className="block text-sm font-medium mb-2">
              Longueur des cheveux *
            </label>
            <select
              id="hairLength"
              value={avatarOptions.hairLength}
              onChange={(e) => setAvatarOptions(prev => ({
                ...prev,
                hairLength: e.target.value
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
            >
              {hairLengths.map(length => (
                <option key={length.id} value={length.id}>{length.name}</option>
              ))}
            </select>
            {errors.hairLength && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.hairLength}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="btn w-full"
          >
            Générer l'avatar
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white/50 dark:bg-dark/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Aperçu de l'avatar</h3>
          <div className="aspect-square bg-accent/20 rounded-lg flex items-center justify-center p-8">
            <AvatarPreview
              avatar={{
                skinTone: avatarOptions.skinTone.replace('peau-', ''),
                eyeColor: avatarOptions.eyeColor.replace('yeux-', ''),
                hairColor: avatarOptions.hairColor.replace('cheveux-', ''),
                hairStyle: avatarOptions.hairStyle,
                hairLength: avatarOptions.hairLength
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}